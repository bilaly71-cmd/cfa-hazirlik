import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

/** Native: dosyayı önbelleğe yazar ve paylaş menüsünü açar (Telegram'a doğrudan gönderilebilir). */
export async function exportFile(name: string, content: string, mime: string) {
  try {
    const file = new File(Paths.cache, name);
    if (file.exists) file.delete();
    file.create();
    file.write(content);
    if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(file.uri, { mimeType: mime, dialogTitle: name });
    return true;
  } catch {
    return false;
  }
}
