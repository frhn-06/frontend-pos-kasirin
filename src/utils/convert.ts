const convert = {
    IDR: (angka: number) => {
        const result = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0 // Menghilangkan 2 angka nol di belakang koma (misal: Rp 1.500.000)
        }).format(angka);

        return result;
    },

    TimeInTable: (date: string) => {
        const result = new Date(date).toLocaleString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        return result;
    }
}

export default convert;