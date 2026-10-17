# Eski sürüme geri dönme

Kararlı sürüm etiketi: **v1.0-stable** (2026-10-17, "şu hâli beğendim" noktası).

Geri dönmek için (PC'de, proje klasöründe):
```bash
git checkout main
git revert --no-edit v1.0-stable..HEAD   # sonraki değişiklikleri geri alır (geçmiş silinmez)
git push
```
Site birkaç dakika içinde eski hâle döner. Tek bir değişikliği geri almak için `git log --oneline` ile commit'i bul, `git revert <kod>` + `git push`.
Telefondaki ilerlemen (cihazda saklanır) sürümden bağımsızdır; etkilenmez.
