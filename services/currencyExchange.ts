import axios from 'axios';

export = {
    getRates: async () => {
        try {
            const result: any = await axios.get('https://open.er-api.com/v6/latest/USD');
            if (result.data.result === 'success') {
                return result.data.rates;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }
}