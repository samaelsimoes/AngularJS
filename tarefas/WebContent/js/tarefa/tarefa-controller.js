(function(){		//invocando a funcao
		'use strict'; //incluindo string  para o navegador nao ignorar erros de sintaxe na função
	
		angular.module("tarefas").controller("TarefaController",Controller);
		Controller.$inject = ["lowercaseFilter"];
		
		// injetando um filtro
		
		function Controller(lc){

			var self = this;
			
			self.tarefa = {};
			self.tarefas=[];
			self.pesquisa = "";
			
			self.novaTarefa = function(){
				self.tarefa = {};
			}
		
			self.salvarTarefa = function(tarefa){
				tarefa.descricao = lc(tarefa.descricao);
				if(tarefa.id){
					editarTarefa(tarefa);
				}else{
					incluirTarefa(tarefa);
				}
			}
			
			function incluirTarefa(tarefa){
				tarefa.id = new Date().getTime();
				self.tarefas.push(tarefa);
				self.novaTarefa();
			}
			
			function editarTarefa(tarefa){
				var pos = -1;
				angular.forEach(this.tarefas,function(item,index){
					if(tarefa.id == item.id){
						pos = index;
					}
				});
				if(pos > -1){
					self.tarefas.splice(pos,1,self.tarefa);
					self.novaTarefa();
				}
			}
			
			this.removerTarefa = function(tarefa){
				var pos = -1;
				angular.forEach(self.tarefas,function(item,index){
					var pos = -1;
					angular.forEach(self.tarefas,function(item,index){
						pos = index;
					});
					if(pos > -1){
						self.tarefas.splice(pos,1);
					}
				});
			}
			self.selecionarTarefa = function(tarefa){
				self.tarefa = angular.copy(tarefa);
			}
		};
})();
		//O angular irá procurar o contexto do Angular angular.module("tarefas") e nisso 
		//registrar no controller no módulo, ou seja o controller Tarefas Controller irá estar disponivel no módulo tarefas
		// temos 2 parametros o nome do controller TAREFAS e uma função contrutora
		// quando está o this diz que a variavel estará disponivel publicamente para todos os outros componentes