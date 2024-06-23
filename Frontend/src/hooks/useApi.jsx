class API {
    static URL = "http://45.235.53.125:8080";

    static async fetchData(endpoint, method, data = null) {
        const url = `${this.URL}${endpoint}`;

        try {
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data ? JSON.stringify(data) : null,
            };

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Erro na solicitação ${method} para ${url}`);
            }
            return response.json();
        } catch (error) {
            throw new Error(`Erro ao fazer a solicitação ${method} para ${url}: ${error.message}`);
        }
    }

    static getProduto() {
        return this.fetchData('/api/produto', 'GET');
    }

    static getCategoria() {
        return this.fetchData('/api/categoria', 'GET');
    }

    static getMarca() {
        return this.fetchData('/api/marca', 'GET');
    }

    static postProduto(data) {
        return this.fetchData('/api/produto', 'POST', data);
    }

    static putProduto(data) {
        return this.fetchData('/api/produto', 'PUT', data);
    }

    static postCategoria(data) {
        return this.fetchData('/api/categoria', 'POST', data);
    }

    static patchAddCategoria(idCategoria, idProduto) {
        return this.fetchData(`/api/produto/addCategoria/?categoria=${idCategoria}&produto=${idProduto}`, 'PATCH');
    }
}

export default API;
