const convert = {
    IDR: (angka: number) => {
        const result = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0 // Menghilangkan 2 angka nol di belakang koma (misal: Rp 1.500.000)
        }).format(angka);

        return result;
    }
}

export default convert;