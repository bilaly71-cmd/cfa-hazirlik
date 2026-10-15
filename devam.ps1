# devam.ps1 — limit dolsa bile Claude Code'u otomatik sürdürür
Set-Location $PSScriptRoot
New-Item -ItemType Directory -Force -Path ".\logs" | Out-Null

while (-not (Test-Path ".\DONE")) {
    $log = ".\logs\run_$(Get-Date -Format yyyyMMdd_HHmmss).log"

    if (-not (Test-Path ".\PROGRESS.md")) {
        # İlk çalıştırma: görevi PROMPT.md'den başlat
        $out = claude -p "PROMPT.md dosyasını oku ve oradaki görevi uygula. Bana soru sorma." `
            --model claude-fable-5-1 --dangerously-skip-permissions 2>&1 | Tee-Object -FilePath $log
    } else {
        # Sonraki çalıştırmalar: son oturumu sürdür
        $out = claude -p "PROGRESS.md'yi oku, PROMPT.md'deki görevi kaldığın yerden sürdür. Bana soru sorma." `
            --continue --model claude-fable-5-1 --dangerously-skip-permissions 2>&1 | Tee-Object -FilePath $log
    }

    $metin = $out -join "`n"
    if ($metin -match "usage limit|limit reached|resets at|rate limit") {
        # Limit doldu: 15 dakikada bir tekrar dene, limit yenilenince kaldığı yerden başlar
        Write-Host "$(Get-Date -Format HH:mm) Limit doldu, 15 dk sonra tekrar denenecek..."
        Start-Sleep -Seconds 900
    } else {
        # Oturum normal bitti ama DONE yok: devam ettir
        Start-Sleep -Seconds 30
    }
}

Write-Host "DONE bulundu, proje tamamlandı."