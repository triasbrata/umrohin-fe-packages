export default function toSnakeCase(str: string) {
  return str
    .trim() // Menghapus spasi di awal dan akhir
    .toLowerCase() // Mengubah semua huruf menjadi huruf kecil
    .replace(/\s+/g, '_') // Mengubah spasi menjadi underscore
    .replace(/[^\w_]/g, '') // Menghapus karakter non-alfanumerik kecuali underscore
}
