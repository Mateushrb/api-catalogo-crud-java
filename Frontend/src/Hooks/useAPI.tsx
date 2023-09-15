class API {
  static URL = "http://45.235.53.125:8080";

  static async fetchData(endpoint: string, method: string, data = null) {
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
    } catch (error: any) {
      throw new Error(`Erro ao fazer a solicitação ${method} para ${url}: ${error.message}`);
    }
  }

  static getProduto = () => this.fetchData('/api/produto', 'GET');
  static getCategoria = () => this.fetchData('/api/categoria', 'GET');

  static postProduto = (data) => this.fetchData('/api/produto', 'POST', data);
  static postCategoria = (data) => this.fetchData('/api/categoria', 'POST', data)

  static patchAddCategoria = (idCategoria, idProduto) => this.fetchData(`/api/produto/addCategoria/?categoria=${idCategoria}&produto=${idProduto}`, 'PATCH')
}

export default API;
