import { defineStore } from "pinia";
import axios from "axios";

export const useProdutosStore = defineStore("produtosStore", {
    state: () => ({ 
        produtos: []
    }),
    actions: {
        async carregaDados() {
            if(this.produtos.length === 0) {
                await axios.get("https://dummyjson.com/products/category/automotive")
                    .then(response => {
                        let preProdutos = response.data.products;
                        this.produtos = preProdutos.map(produto => ({
                            ...produto,
                            quantidade: 0,
                            mostrarNoCarrinho: false,
                        }));
                    })
                    .catch(err => {
                        return "Erro ao carregar produtos da API"+err;
                    });
            }
        },
        adicionaUmNaQuantidade(idProduto: number) {
            const produto = this.produtos.findIndex(produto => produto.id === idProduto);
            this.produtos[produto].quantidade += 1;
        },
        diminuiUmNaQuantidade(idProduto: number) {
            const produto = this.produtos.findIndex(produto => produto.id === idProduto);
            if(this.produtos[produto].quantidade > 0) {
                this.produtos[produto].quantidade -= 1;
            }            
        },
        adicionaItemCarrinho(idProduto: number) {
            console.log(idProduto);
            const produto = this.produtos.findIndex(produto => produto.id === idProduto);
            this.produtos[produto].mostrarNoCarrinho = true;
        },
        removeItemCarrinho(idProduto: number){
            const produto = this.produtos.findIndex(produto => produto.id === idProduto);
            this.produtos[produto].quantidade = 0;
            this.produtos[produto].mostrarNoCarrinho = false;
        }

    },
})