Ext.require([
    'Ext.selection.CheckboxModel',
    'Ext.selection.CellModel',
    'Ext.layout.container.Accordion',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*'
]);

Ext.create('Ext.container.Viewport', {
    layout: 'border',
    autoload: true,
    listeners: {
        beforerender: function() {

            var gridsit = Ext.getCmp('gsit');
            var bStore = gridsit.getStore();
            bStore.load();

            Ext.Ajax.request({

                url: '/teste2/php/updtSitu.php',
                params: {
                    action: 'post',
                    user: mat
                },
                success: function(response) {
                    situacao = Ext.JSON.decode(response.responseText);

                    situ = situacao;

                },
                failure: function() {

                }
            });
            if (niv == 6) {

                Ext.getCmp('idSolValr').hide();
                Ext.getCmp('idGerSolVlr').show();
                Ext.getCmp('sitsubord').hide();
                Ext.getCmp('btncadplan').hide();
                Ext.getCmp('btnNReali').hide();
                Ext.getCmp('btnPlan').hide();
                Ext.getCmp('idAdm').hide();
                Ext.getCmp('histsaldo').hide();
                Ext.getCmp('sit').hide();

                if(resultado != '0'){ 
                    Ext.Msg.show({
                        title:'Mensagem',
                        msg: 'Existem solicitações pendentes de validação.',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR,
                        closable: false
                     });
                }
            }else
            if (niv == 4) {

                //planejamento
                //Ext.getCmp('idRel').hide();
                Ext.getCmp('idAdm').hide();
                Ext.getCmp('sitsubord').hide();
                //Ext.getCmp('btnRelPres').show();
                //Ext.getCmp('btnRelPlan').show();
                //Ext.getCmp('btnOut').show();
                Ext.getCmp('btnPlan').hide();
                Ext.getCmp('btncadplan').show();
                Ext.getCmp('sit').show();
                Ext.getCmp('idgrager').hide();
                Ext.getCmp('idgervlr').hide();
                Ext.getCmp('btnNReali').hide();
                //prestação
                Ext.getCmp('btnPreGer').hide();
                Ext.getCmp('btnPre').show();
                Ext.getCmp('histsaldo').setWidth(770);
                Ext.getCmp('histsaldo').setHeight(450);
                Ext.getCmp('histsld').setHeight(450);
                Ext.getCmp('idencdep').hide();
                Ext.getCmp('locadd').hide();
                Ext.getCmp('idSolValr').hide();
                Ext.getCmp('idGerSolVlr').hide();

            } else
            if (niv == 3) {
                //planejamento
                Ext.getCmp('sitsubord').show();
                Ext.getCmp('idgerlot').hide();
                Ext.getCmp('iddefpar').hide();
                //Ext.getCmp('btnRelPres').hide();
                //Ext.getCmp('btnRelPlan').hide();
                //Ext.getCmp('btnOut').hide();
                Ext.getCmp('btnPlan').show();
                Ext.getCmp('btncadplan').show();
                Ext.getCmp('idencdep').hide();
                Ext.getCmp('idgrager').hide();
                Ext.getCmp('idgervlr').hide();
                Ext.getCmp('btnNReali').hide();
                Ext.getCmp('locadd').hide();
                Ext.getCmp('idSolValr').hide();
                Ext.getCmp('idGerSolVlr').hide();

                if (codcargo == 6600) {

                    Ext.getCmp('sit').hide();
                    Ext.getCmp('histsaldo').hide();
                    Ext.getCmp('histsaldo').hide();
                } else {

                    Ext.getCmp('sit').show();
                    Ext.getCmp('histsaldo').setWidth(770);
                    Ext.getCmp('histsaldo').setHeight(200);
                }

                //prestação
                Ext.getCmp('btnPreGer').show();
                Ext.getCmp('btnPre').show();
                Ext.getCmp('idAdm').hide();
                Ext.getCmp('locadd').hide();

            } else
            if (niv == 2) {
                Ext.getCmp('sitsubord').show();
                Ext.getCmp('idAdm').show(); //menu administração idgerplan
                //administração:
                Ext.getCmp('idgerlot').hide();
                Ext.getCmp('idlibpr').hide();
                Ext.getCmp('idgerplan').show();
                Ext.getCmp('iddefpar').hide();
                Ext.getCmp('idencdep').hide();
                Ext.getCmp('idgerplanreg').show();
                Ext.getCmp('sit').hide();
                Ext.getCmp('idgrager').hide();
                Ext.getCmp('idgervlr').show();
                Ext.getCmp('locadd').hide();

                Ext.getCmp('btncadplan').show();
                Ext.getCmp('btnNReali').show();

                //prestação
                Ext.getCmp('btnPreGer').show();
                Ext.getCmp('btnPre').show();

                Ext.getCmp('histsaldo').hide();

                Ext.getCmp('sitsubord').setWidth(770);
                Ext.getCmp('sitsubord').setHeight(470);
                Ext.getCmp('gridsubord').setHeight(600);
                Ext.getCmp('idSolValr').hide();

                //Tratamento para os cargos G.O/C.R
                if(codcargo == 7800){
                    Ext.getCmp('idSolValr').show();
                    Ext.getCmp('histsaldo').show();
                    Ext.getCmp('btncadplan').hide();
                    Ext.getCmp('btnNReali').hide();
                    Ext.getCmp('btnPlan').hide();
                    Ext.getCmp('sitsubord').hide();
                    Ext.getCmp('idAdm').hide();
                    Ext.getCmp('btnPreGer').hide();
                    Ext.getCmp('idGerSolVlr').hide();                    
                
                  if(stspla === '0'){  
                    Ext.Msg.show({
                        title:'Mensagem',
                        msg: 'Sua solicitação foi recusada pelo Gerente de Operações. Por gentileza regularizar.',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR,
                        closable: false
                     });
                  }                     
                }

                if(codcargo == 6500){
                    Ext.getCmp('idSolValr').show();
                    Ext.getCmp('idGerSolVlr').show();
                    Ext.getCmp('histsaldo').show();
                    Ext.getCmp('btncadplan').hide();
                    Ext.getCmp('btnNReali').hide();
                    Ext.getCmp('btnPlan').hide();
                    Ext.getCmp('sitsubord').hide();
                    Ext.getCmp('idAdm').hide();
                    
                   if(stspla === '0'){ 
                    Ext.Msg.show({
                        title:'Mensagem',
                        msg: 'Sua solicitação foi recusada pelo Gerente Geral de Operações.Por gentileza regularizar.',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR,
                        closable: false
                     });
                   } 
                }

            } else
            if (niv == 1) {
                Ext.getCmp('histsaldo').hide();
                Ext.getCmp('sitsubord').hide();
                Ext.getCmp('idgerplanreg').show(); ////hide
                Ext.getCmp('sit').hide();
                Ext.getCmp('idgrager').show();
                Ext.getCmp('idgervlr').show();
                Ext.getCmp('btnNReali').show();
                //prestação
                Ext.getCmp('btnPreGer').show();
                Ext.getCmp('btnPre').show();
                Ext.getCmp('idencdep').show();
                Ext.getCmp('locadd').show();
                Ext.getCmp('idSolValr').hide();
                Ext.getCmp('idGerSolVlr').hide();
                
            }
        }
    },
    items: [{
            region: 'west',
            layout: 'accordion',
            title: 'Menu de Acesso',
            //collapsible: true,
            //split: true,
            activeOnTop: true,
            //collapseFirst: true,
            //useArrows: true,
            width: 190,
            defaults: {

                bodyPadding: 10
            },
            items: [{
                        title: 'gambiarra',
                        hidden: true,
                        collapsed: false
                    },
                    {
                        title: 'Planejamento',
                        id: 'idPlan',
                        iconCls: 'icon-planejamento',
                        items: [

                            {
                                xtype: 'button',
                                id: 'btncadplan',
                                width: 155,
                                text: 'Cadastrar Planejamento',
                                handler: function() {

                                    Ext.create('desloc.view.PlanejamentoForm');
                                    var regC = Ext.getCmp('regCombo');
                                    var uniC = Ext.getCmp('uniCombo');
                                    var colC = Ext.getCmp('usuCombo');
                                    var status = Ext.getCmp('statusCombo');
                                    var mesC = Ext.getCmp('mesCombo');
                                    var anoC = Ext.getCmp('anoCombo');
                                    //var dataI = Ext.getCmp('data_ini');
                                    //var dataF = Ext.getCmp('data_fim');
                                    var pGrid = Ext.getCmp('gridplan');

                                    Ext.getCmp('janplan').setTitle('Cadastrar Planejamento');

                                    //Maximizar Janela 
                                    Ext.getCmp('janplan').maximize(); 


                                    bt = 1; // variavel para tratamento de botões planejamento

                                    var btnP = 0;
                                    var aStore = pGrid.getStore();
                                    aStore.load({
                                        params: {
                                            btn: btnP
                                        }
                                    });

                                    if (niv == 4) { //Tratamento de Nível 4 - Agente
                                        var val = 0;

                                        //Tratamento para habilitar botão novo planejamento
                                        Ext.getCmp('btn_nov').setDisabled(true);
                                        Ext.Ajax.request({
                                            url: '/teste2/php/Planejamento/HabBtnNov.php',
                                            //method:'get',
                                            //params: {
                                            // mat: val
                                            //},
                                            success: function(response) {

                                                var result = Ext.JSON.decode(response.responseText);
                                                //console.log(result);
                                                if (result == 1) {
                                                    //Código...
                                                    Ext.getCmp('btn_nov').setDisabled(false);
                                                } else {

                                                    Ext.getCmp('btn_nov').setDisabled(true);
                                                    //sStore.load();
                                                }
                                            },
                                            failure: function() {

                                                //Ext.Msg.alert('Mensagem','Problema Na Base de Dados!');
                                            }
                                        });

                                        //Fim do tratamento botão novo

                                        regC.setDisabled(true);
                                        regC.emptyText = reg;
                                        regC.applyEmptyText();

                                        uniC.setDisabled(true);
                                        uniC.emptyText = unid;
                                        uniC.applyEmptyText();

                                        colC.setDisabled(true);
                                        colC.emptyText = col;
                                        colC.applyEmptyText();
                                        status.setDisabled(true); //destroy();

                                        Ext.getCmp('gridplan').show();
                                        //setDisabled(true);
                                        //Ext.getCmp('btn_nov').setDisabled(true);
                                        Ext.getCmp('btn_val').hide();
                                        Ext.getCmp('btn_excel').show();
                                        //Ext.getCmp('btn_txt').hide();
                                        Ext.getCmp('btn_busc').show();
                                        Ext.getCmp('btn_filtro').show();
                                        Ext.getCmp('btn_reab').hide();
                                        Ext.getCmp('gambCombo').setMargin('120 0 0 0');
                                        //Ext.getCmp('btSair').setMargin('0 0 0 -100')

                                        colC.setWidth(450);
                                        mesC.setWidth(265);
                                        anoC.setMargin('-36 0 0 275');
                                        anoC.setWidth(175);

                                        status.hide();
                                        regC.hide();
                                        uniC.hide();
                                        anoC.show();
                                        mesC.show();

                                    } //fim do nível 4
                                    else
                                    if (niv == 2) { //Tratamento de Nível 2 - Regional

                                        Ext.getCmp('btn_nov').setDisabled(true);
                                        //Ext.getCmp('btn_encplan').setDisabled(true);
                                        //Ext.getCmp('btn_aut').setDisabled(true);
                                        Ext.getCmp('btn_val').hide();
                                        //Ext.getCmp('btn_reab').setDisabled(true);
                                        //Ext.getCmp('btn_prestacao').hide();
                                        //Ext.getCmp('btn_txt').hide();
                                        Ext.getCmp('btn_excel').hide();
                                        Ext.getCmp('btn_reab').hide();
                                        Ext.getCmp('gambCombo').setMargin('120 0 0 0');
                                        //regC.setDisabled(true);
                                        //regC.emptyText = reg;
                                        //regC.applyEmptyText();
                                        status.hide();
                                        regC.hide();
                                        anoC.hide();
                                        mesC.hide();

                                        uniC.setWidth(450);
                                        colC.setWidth(450);
                                        status.setWidth(450);

                                        uniC.setDisabled(false);
                                        colC.setDisabled(false);

                                        status.emptyText = "Selecione uma Situação";

                                        uniC.store.load({
                                            params: { regId: codreg, codniv: niv }
                                        });
                                    } //fim do nível 2
                                    else
                                    if (niv == 3) { //Tratamento de Nível 3 - Coordenador

                                        //Tratamento para habilitar botão novo planejamento
                                        Ext.Ajax.request({
                                            url: '/teste2/php/Planejamento/HabBtnNov.php',
                                            method: 'get',
                                            params: {
                                                mat: mat
                                            },
                                            success: function(response) {

                                                var result = Ext.JSON.decode(response.responseText);
                                                //console.log(result);
                                                if (result == 1) {
                                                    //Código...
                                                    Ext.getCmp('btn_nov').setDisabled(false);
                                                } else {

                                                    Ext.getCmp('btn_nov').setDisabled(true);
                                                    //sStore.load();
                                                }

                                            },
                                            failure: function() {

                                                //Ext.Msg.alert('Msg','Problema Na Base de Dados!');
                                            }
                                        });

                                        //Fim do tratamento botão novo

                                        Ext.getCmp('btn_val').hide();
                                        Ext.getCmp('btn_nov').setDisabled(true);

                                        //Ext.getCmp('btn_prestacao').hide();
                                        //Ext.getCmp('btn_txt').hide();
                                        Ext.getCmp('btn_filtro').show();
                                        Ext.getCmp('btn_excel').hide();
                                        Ext.getCmp('btn_reab').hide();
                                        Ext.getCmp('gambCombo').setMargin('120 0 0 0');

                                        uniC.setDisabled(true);
                                        uniC.emptyText = unid;
                                        uniC.applyEmptyText();

                                        regC.setDisabled(true);
                                        regC.emptyText = reg;
                                        regC.applyEmptyText();

                                        colC.setWidth(450);
                                        colC.setDisabled(false);

                                        if (codcargo == 6600) {
                                            colC.emptyText = 'Selecione um colaborador';

                                        } else {
                                            colC.setValue(col);
                                        }

                                        status.emptyText = "Selecione uma Situação";
                                        status.hide();
                                        regC.hide();
                                        uniC.hide();
                                        anoC.hide();
                                        mesC.hide();
                                        //dataI.hide();
                                        //dataF.hide();

                                        colC.store.load({
                                            params: { uniId: codund }
                                        });

                                    } // fim do nível 3
                                    else
                                    if (niv == 1) { //Tratamento de Nível 1 - Sede

                                        Ext.getCmp('btn_nov').setDisabled(true);
                                        Ext.getCmp('btn_val').hide();
                                        Ext.getCmp('btn_excel').hide();
                                        Ext.getCmp('btn_reab').hide();

                                        Ext.getCmp('gambCombo').setMargin('120 0 0 0');
                                        //Ext.getCmp('btSair').setMargin('0 0 0 -100');

                                        //setar css para combo regional
                                        regC.setWidth(350);
                                        //setar css para combo unidade
                                        //uniC.setMargin('-36 0 0 370');
                                        uniC.setWidth(350);
                                        //setar css para combo colaborador
                                        colC.setWidth(350);
                                        //colC.setMargin('-36 0 0 0');
                                        //setar css para combo situação
                                        status.hide();
                                        status.setWidth(350);
                                        status.setMargin('-73 0 0 370');
                                        //setar css para combo refrência
                                        mesC.hide();
                                        mesC.setMargin('-73 0 0 0');
                                        mesC.setWidth(220);
                                        anoC.hide();
                                        anoC.setMargin('-109 0 0 250');
                                        anoC.setWidth(100);

                                        regC.emptyText = "Sede";
                                        regC.applyEmptyText();
                                    }
                                }
                            }, //Fim do botão cadastro
                            {
                                xtype: 'button',
                                id: 'btnPlan',
                                width: 155,
                                text: 'Gerênciar Planejamento',
                                style: {
                                    margin: '5 0 0 0'
                                },
                                handler: function() {

                                    Ext.create('desloc.view.PlanejamentoForm');
                                    var regC = Ext.getCmp('regCombo');
                                    var uniC = Ext.getCmp('uniCombo');
                                    var colC = Ext.getCmp('usuCombo');
                                    var status = Ext.getCmp('statusCombo');
                                    var mesC = Ext.getCmp('mesCombo');
                                    var anoC = Ext.getCmp('anoCombo');
                                    bt = 0;

                                    Ext.getCmp('janplan').setTitle('Gerenciar Planejamento');

                                    var btnPg = 1;
                                    var pGrid = Ext.getCmp('gridplan');
                                    var aStore = pGrid.getStore();
                                    aStore.load({
                                        params: {
                                            btn: btnPg
                                        }
                                    });


                                    if (niv == 4) { //Tratamento de Nível 4 - Agente
                                        var val = 0;

                                        //Tratamento para habilitar botão novo planejamento

                                        Ext.Ajax.request({
                                            url: '/teste2/php/Planejamento/HabBtnNov.php',
                                            //method:'get',
                                            //params: {
                                            // mat: val
                                            //},
                                            success: function(response) {

                                                var result = Ext.JSON.decode(response.responseText);
                                                //console.log(result);
                                                if (result == 1) {
                                                    //Código...
                                                } else {

                                                    Ext.getCmp('btn_nov').setDisabled(false);
                                                    //sStore.load();
                                                }
                                            },
                                            failure: function() {

                                                //Ext.Msg.alert('Msg','Problema Na Base de Dados!');
                                            }
                                        });

                                        //Fim do tratamento botão novo

                                        regC.setDisabled(true);
                                        regC.emptyText = reg;
                                        regC.applyEmptyText();

                                        uniC.setDisabled(true);
                                        uniC.emptyText = unid;
                                        uniC.applyEmptyText();

                                        colC.setDisabled(true);
                                        colC.emptyText = col;
                                        colC.applyEmptyText();

                                        status.setDisabled(true); //destroy();

                                        Ext.getCmp('gridplan').show();
                                        //setDisabled(true);
                                        Ext.getCmp('btn_nov').setDisabled(true);
                                        //Ext.getCmp('btn_encplan').hide();
                                        //Ext.getCmp('btn_prestacao').hide();
                                        //Ext.getCmp('btn_aut').hide();
                                        Ext.getCmp('btn_val').hide();
                                        //Ext.getCmp('btn_reab').hide();
                                        Ext.getCmp('btn_txt').hide();
                                        Ext.getCmp('btn_busc').hide();
                                        Ext.getCmp('btn_filtro').show();
                                        Ext.getCmp('btSair').show();


                                    } //fim do nível 4
                                    else
                                    if (niv == 2) { //Tratamento de Nível 2 - Regional
                                        Ext.getCmp('btn_nov').hide();
                                        Ext.getCmp('btn_val').setDisabled(true);
                                        Ext.getCmp('btn_reab').setDisabled(true);
                                        regC.hide();

                                        uniC.setDisabled(false);
                                        colC.setDisabled(false);

                                        uniC.setWidth(450);
                                        //setar css para combo colaborador
                                        colC.setWidth(450);
                                        //setar css para combo situação
                                        status.setWidth(450);
                                        mesC.setWidth(265);
                                        anoC.setMargin('-36 0 0 275');
                                        anoC.setWidth(175);

                                        status.emptyText = "Selecione uma Situação";

                                        uniC.store.load({
                                            params: { regId: codreg, codniv: niv }
                                        });
                                    } //fim do nível 2
                                    else
                                    if (niv == 3) { //Tratamento de Nível 3 - Coordenador
                                        Ext.getCmp('btn_nov').hide();
                                        Ext.getCmp('btn_val').hide();
                                        Ext.getCmp('btn_reab').hide();
                                        //Ext.getCmp('btn_prestacao').hide();
                                        //Ext.getCmp('btn_txt').hide();
                                        Ext.getCmp('btn_filtro').show();
                                        Ext.getCmp('btSair').show();

                                        uniC.setDisabled(true);
                                        uniC.emptyText = unid;
                                        uniC.applyEmptyText();

                                        regC.setDisabled(true);
                                        regC.emptyText = reg;
                                        regC.applyEmptyText();

                                        colC.setDisabled(false);

                                        status.emptyText = "Selecione uma Situação";

                                        regC.hide();
                                        uniC.hide();

                                        colC.setWidth(450);
                                        status.setWidth(450);
                                        mesC.setWidth(265);
                                        anoC.setMargin('-36 0 0 275');
                                        anoC.setWidth(175);

                                        colC.store.load({
                                            params: { uniId: codund }
                                        });
                                    } // fim do nível 3
                                    else
                                    if (niv == 1) { //Tratamento de Nível 1 - Sede

                                        Ext.getCmp('btn_nov').hide();
                                        Ext.getCmp('btn_val').setDisabled(true)
                                        Ext.getCmp('btn_reab').setDisabled(true);
                                        //Ext.getCmp('btSair').setMargin('0 0 0 -180');

                                        //setar css para form gerência
                                        //Ext.getCmp('formGer').setWidth(900);
                                        //setar css para combo regional
                                        regC.setWidth(350);
                                        //setar css para combo unidade
                                        uniC.setMargin('-36 0 0 370');
                                        uniC.setWidth(350);
                                        //setar css para combo colaborador
                                        colC.setWidth(350);
                                        colC.setMargin('-36 0 0 0');
                                        //setar css para combo situação
                                        status.setWidth(350);
                                        status.setMargin('-73 0 0 370');
                                        //setar css para combo refrência
                                        mesC.setMargin('-73 0 0 0');
                                        mesC.setWidth(220);
                                        anoC.setMargin('-109 0 0 250');
                                        anoC.setWidth(100);


                                        regC.emptyText = "Sede";
                                        regC.applyEmptyText();
                                    }
                                }
                            }, //fim do botão gerência
                            {
                                xtype: 'button',
                                id: 'idSolValr',
                                text: 'Solicitar Valor',
                                width: 155,
                                style: {

                                    margin: '5 0 0 0'
                                },
                                handler: function(){
                                    //Chamar tela de solicitar valor
                                    Ext.create('desloc.view.cargosGestao.solicitarValor');

                                    //Tratamento para o Coordenador Regional
                                    if(codcargo == 7800){

                                        Ext.getCmp('gridCadGer').hide();
                                        Ext.getCmp('solvlr').maximize();
                                    }                                    

                                    //Tratamento para Gerente de Operações
                                    if(codcargo == 6500){

                                        Ext.getCmp('gridCadCoord').hide();
                                        Ext.getCmp('solvlr').maximize();
                                    }                                    

                                    var regC = Ext.getCmp('regCombo');
                                    var uniC = Ext.getCmp('uniCombo');
                                    var colC = Ext.getCmp('usuCombo');
                                    var status = Ext.getCmp('statusCombo');
                                    var mesC = Ext.getCmp('mesCombo');
                                    var anoC = Ext.getCmp('anoCombo');

                                        regC.setDisabled(true);
                                        regC.emptyText = reg;
                                        regC.applyEmptyText();

                                        uniC.setDisabled(true);
                                        uniC.emptyText = unid;
                                        uniC.applyEmptyText();

                                        colC.setDisabled(true);
                                        colC.emptyText = col;
                                        colC.applyEmptyText();
                                        status.setDisabled(true);

                                        colC.setWidth(450);
                                        mesC.setWidth(265);
                                        anoC.setMargin('-36 0 0 275');
                                        anoC.setWidth(175);

                                        status.hide();
                                        regC.hide();
                                        uniC.hide();
                                        anoC.show();
                                        mesC.show();


                                    //Tratamento para habilitar botão novo planejamento
                                    Ext.getCmp('btn_novo').setDisabled(true);

                                    Ext.Ajax.request({
                                        url: '/teste2/php/Planejamento/HabBtnNov.php',
                                        success: function(response) {

                                            var result = Ext.JSON.decode(response.responseText);
                                            //console.log(result);
                                            if (result == 1) {
                                                Ext.getCmp('btn_novo').setDisabled(false);
                                            } else {
                                                Ext.getCmp('btn_novo').setDisabled(true);
                                                //sStore.load();
                                            }
                                        },
                                        failure: function() {

                                            //Ext.Msg.alert('Mensagem','Problema Na Base de Dados!');
                                        }
                                    });
                                    //Fim do tratamento botão novo
                                }
                            },
                            {
                                xtype: 'button',
                                id: 'idGerSolVlr',
                                width: 155,
                                text: 'Gerenciar Valor',
                                style: {

                                    margin: '5 0 0 0'
                                },
                                handler: function() {
                                    //Chamar tela de solicitar valor
                                    Ext.create('desloc.view.cargosGestao.gerSolicitarValor');
                                    Ext.getCmp('gersolvlr').maximize();

                                    var regC = Ext.getCmp('regCombo');
                                    var uniC = Ext.getCmp('uniCombo');
                                    var colC = Ext.getCmp('usuCombo');
                                    var status = Ext.getCmp('statusCombo');
                                    var mesC = Ext.getCmp('mesCombo');
                                    var anoC = Ext.getCmp('anoCombo');
                                
                                    Ext.getCmp('btn_novo').hide();
                                    Ext.getCmp('btn_validar').setDisabled(true);
                                    Ext.getCmp('btn_reabrir').setDisabled(true);
                                    regC.setDisabled(true);
                                    regC.emptyText = reg;
                                    regC.applyEmptyText();

                                    uniC.setDisabled(true);
                                    uniC.emptyText = unid;
                                    uniC.applyEmptyText();

                                    colC.setDisabled(false);
                                    colC.emptyText = "Selecione um colaborador";                                    
                                    
                                    colC.setWidth(450);
                                    mesC.setWidth(265);
                                    anoC.setMargin('-36 0 0 275');
                                    anoC.setWidth(175);

                                    regC.hide();
                                    uniC.hide();
                                    anoC.show();
                                    mesC.show();

                                    status.emptyText = "Selecione uma situação";
                                    status.setWidth(450);

                                    colC.store.load({
                                        params: { uniId: codund }
                                    });
                                }
                            },  
                            {
                                xtype: 'button',
                                id: 'btnNReali',
                                width: 155,
                                text: 'Não Realizados',
                                style: {
                                    margin: '5 0 0 0'
                                },
                                handler: function() {

                                    Ext.create('desloc.view.PlanNRealizados');
                                    var regC = Ext.getCmp('regCombo');
                                    var uniC = Ext.getCmp('uniCombo');
                                    var colC = Ext.getCmp('usuCombo');
                                    var status = Ext.getCmp('statusCombo');
                                    var mesC = Ext.getCmp('mesCombo');
                                    var anoC = Ext.getCmp('anoCombo');


                                    regC.setWidth(350);

                                    if (niv == 1) {

                                        regC.show();
                                    } else {

                                        regC.hide();
                                    }
                                    //setar css para combo unidade
                                    //uniC.setMargin('0 0 0 270');
                                    uniC.setWidth(350);
                                    uniC.setDisabled(false);
                                    //setar css para combo colaborador
                                    colC.setWidth(350);
                                    //colC.setMargin('-36 0 0 0');
                                    //setar css para combo situação
                                    status.hide();
                                    status.setWidth(350);
                                    status.setMargin('-73 0 0 370');
                                    //setar css para combo refrência
                                    //mesC.hide();
                                    mesC.setMargin('0 0 0 0');
                                    mesC.setWidth(220);
                                    //anoC.hide();
                                    anoC.setMargin('-36 0 0 250');
                                    anoC.setWidth(100);

                                    //Ext.getCmp('btSairPre').setMargin('0 0 0 -100');

                                    regC.emptyText = "Sede";
                                    regC.applyEmptyText();

                                    uniC.store.load({
                                        params: { regId: codreg, codniv: niv }
                                    });

                                }

                            } //Fim do botão não realizados
                        ]
                    },
                    {
                        title: 'Prestação',
                        id: 'idPre',
                        iconCls: 'icon-prestacao',
                        items: [{
                                xtype: 'button',
                                id: 'btnPre',
                                width: 147,
                                text: 'Cadastrar Prestação',
                                handler: function() {

                                        Ext.create('desloc.view.PrestacaoForm');
                                        var regC = Ext.getCmp('regCombo');
                                        var uniC = Ext.getCmp('uniCombo');
                                        var colC = Ext.getCmp('usuCombo');
                                        var status = Ext.getCmp('statusCombo');
                                        var mesC = Ext.getCmp('mesCombo');
                                        var anoC = Ext.getCmp('anoCombo');
                                        var pGrid = Ext.getCmp('gridpre');
                                        //var extAplan = Ext.getCmp('teste');

                                        bt = 1; // variavel para tratamento de botões prestação

                                        Ext.getCmp('janpres').setTitle('Cadastrar Prestação');

                                        var btnP = 0;
                                        var aStore = pGrid.getStore();
                                        aStore.load({
                                            params: {
                                                btn: btnP,
                                                mat: mat
                                            }
                                        });

                                        if (niv == 4) { //Tratamento de Nível 4 - Agente

                                            colC.setDisabled(true);
                                            colC.emptyText = col;
                                            colC.applyEmptyText();
                                            status.hide();

                                            Ext.getCmp('btn_autori').hide();
                                            Ext.getCmp('btn_reab').hide();
                                            //Ext.getCmp('btn_just').hide();
                                            Ext.getCmp('btn_excel').hide();
                                            Ext.getCmp('btn_conc').hide();
                                            Ext.getCmp('btn_filtro').show();

                                            colC.setWidth(450);
                                            mesC.setWidth(265);
                                            anoC.setMargin('-36 0 0 275');
                                            anoC.setWidth(175);
                                            //Ext.getCmp('btSairPre').setMargin('0 0 0 -100');

                                            status.hide();
                                            regC.hide();
                                            uniC.hide();
                                            anoC.show();
                                            mesC.show();

                                        } else
                                        if (niv == 2) { //Tratamento de Nível 2 - Regional
                                            Ext.getCmp('btn_autori').hide();
                                            Ext.getCmp('btn_reab').hide();
                                            Ext.getCmp('btn_conc').hide();
                                            Ext.getCmp('btn_excel').hide();

                                            status.hide();
                                            regC.hide();
                                            anoC.hide();
                                            mesC.hide();

                                            uniC.setWidth(450);
                                            colC.setWidth(450);
                                            status.setWidth(450);

                                            uniC.setDisabled(false);
                                            colC.setDisabled(false);
                                            //Ext.getCmp('btSairPre').setMargin('0 0 0 80');

                                            status.emptyText = "Selecione uma Situação";

                                            uniC.store.load({
                                                params: { regId: codreg, codniv: niv }
                                            });

                                        } else
                                        if (niv == 3) { //Tratamento de Nível 3 - Coordenador

                                            Ext.getCmp('btn_autori').hide();
                                            Ext.getCmp('btn_reab').hide();
                                            Ext.getCmp('btn_conc').hide();
                                            Ext.getCmp('btn_excel').hide();

                                            uniC.setDisabled(true);
                                            uniC.emptyText = unid;
                                            uniC.applyEmptyText();

                                            regC.setDisabled(true);
                                            regC.emptyText = reg;
                                            regC.applyEmptyText();

                                            colC.setWidth(450);
                                            colC.setDisabled(false);

                                            if (codcargo == 6600) {
                                                colC.emptyText = 'Selecione um colaborador';

                                            } else {
                                                colC.setValue(col);
                                            }

                                            //colC.emptyText = col;
                                            //Ext.getCmp('btSairPre').setMargin('0 0 0 80');

                                            status.emptyText = "Selecione uma Situação";
                                            status.hide();
                                            regC.hide();
                                            uniC.hide();
                                            anoC.hide();
                                            mesC.hide();

                                            colC.store.load({
                                                params: { uniId: codund }
                                            });

                                        } else
                                        if (niv == 1) { //Tratamento de Nível 1 - Sede

                                            //Ext.getCmp('btn_encplan').hide();
                                            //Ext.getCmp('btn_valid').hide();
                                            Ext.getCmp('btn_autori').hide();
                                            Ext.getCmp('btn_reab').hide();
                                            Ext.getCmp('btn_conc').hide();
                                            Ext.getCmp('btn_excel').hide();

                                            //Ext.getCmp('gambCombo').setMargin('120 0 0 0');
                                            //setar css para combo regional
                                            regC.setWidth(350);
                                            //setar css para combo unidade
                                            //uniC.setMargin('-36 0 0 370');
                                            uniC.setWidth(350);
                                            //setar css para combo colaborador
                                            colC.setWidth(350);
                                            //colC.setMargin('-36 0 0 0');
                                            //setar css para combo situação
                                            status.hide();
                                            status.setWidth(350);
                                            status.setMargin('-73 0 0 370');
                                            //setar css para combo refrência
                                            mesC.hide();
                                            mesC.setMargin('-73 0 0 0');
                                            mesC.setWidth(220);
                                            anoC.hide();
                                            anoC.setMargin('-109 0 0 250');
                                            anoC.setWidth(100);

                                            //Ext.getCmp('btSairPre').setMargin('0 0 0 -100');

                                            regC.emptyText = "Sede";
                                            regC.applyEmptyText();
                                        }

                                    } // fim da função click
                            }, //fim do botão
                            {
                                xtype: 'button',
                                id: 'btnPreGer',
                                width: 147,
                                text: 'Gerenciar Prestação',
                                style: {
                                    margin: '5 0 0 0'
                                },
                                handler: function() {
                                        Ext.create('desloc.view.PrestacaoForm');
                                        var regC = Ext.getCmp('regCombo');
                                        var uniC = Ext.getCmp('uniCombo');
                                        var colC = Ext.getCmp('usuCombo');
                                        var status = Ext.getCmp('statusCombo');
                                        var mesC = Ext.getCmp('mesCombo');
                                        var anoC = Ext.getCmp('anoCombo');

                                        bt = 0;

                                        Ext.getCmp('janpres').setTitle('Gerenciar Prestação');

                                        var btnPg = 1;
                                        var pGrid = Ext.getCmp('gridpre');
                                        var aStore = pGrid.getStore();
                                        aStore.load({
                                            params: {
                                                btn: btnPg
                                            }
                                        });

                                        if (niv == 4) { //Tratamento de Nível 4 - Agente

                                            regC.setDisabled(true);
                                            regC.emptyText = reg;
                                            regC.applyEmptyText();

                                            uniC.setDisabled(true);
                                            uniC.emptyText = unid;
                                            uniC.applyEmptyText();

                                            colC.setDisabled(true);
                                            colC.emptyText = col;
                                            colC.applyEmptyText();

                                            status.setDisabled(true);

                                            Ext.getCmp('btn_autori').hide();
                                            Ext.getCmp('btn_reab').hide();
                                            Ext.getCmp('btn_conc').hide();
                                            Ext.getCmp('btn_filtro').hide();

                                        } else
                                        if (niv == 2) { //Tratamento de Nível 2 - Regional
                                            Ext.getCmp('btn_autori').setDisabled(true);
                                            Ext.getCmp('btn_reab').setDisabled(true);
                                            Ext.getCmp('btn_conc').hide();
                                            Ext.getCmp('btn_excel').show();

                                            regC.hide();

                                            uniC.setDisabled(false);
                                            colC.setDisabled(false);

                                            uniC.setWidth(450);
                                            colC.setWidth(450);
                                            status.setWidth(450);
                                            mesC.setWidth(265);
                                            anoC.setMargin('-36 0 0 275');
                                            anoC.setWidth(175);
                                            //Ext.getCmp('btSairPre').setMargin('0 0 0 -180');

                                            status.emptyText = "Selecione uma Situação";

                                            uniC.store.load({
                                                params: { regId: codreg, codniv: niv }
                                            });

                                        } else
                                        if (niv == 3) { //Tratamento de Nível 3 - Coordenador
                                            Ext.getCmp('btn_autori').hide();
                                            Ext.getCmp('btn_reab').hide();
                                            Ext.getCmp('btn_conc').hide();
                                            Ext.getCmp('btn_excel').show();

                                            uniC.setDisabled(true);
                                            uniC.emptyText = unid;
                                            uniC.applyEmptyText();

                                            regC.setDisabled(true);
                                            regC.emptyText = reg;
                                            regC.applyEmptyText();

                                            colC.setDisabled(false);

                                            status.emptyText = "Selecione uma Situação";

                                            regC.hide();
                                            uniC.hide();

                                            colC.setWidth(450);
                                            status.setWidth(450);
                                            mesC.setWidth(265);
                                            anoC.setMargin('-36 0 0 275');
                                            anoC.setWidth(175);
                                            //Ext.getCmp('btSairPre').setMargin('0 0 0 -200');

                                            colC.store.load({
                                                params: { uniId: codund }
                                            });

                                        } else
                                        if (niv == 1) { //Tratamento de Nível 1 - Sede

                                            //Ext.getCmp('btn_val').setDisabled(true)
                                            Ext.getCmp('btn_reab').setDisabled(true);
                                            Ext.getCmp('btn_autori').setDisabled(true);
                                            Ext.getCmp('btn_conc').setDisabled(true);
                                            Ext.getCmp('btn_excel').show();

                                            regC.setWidth(350);
                                            //setar css para combo unidade
                                            uniC.setMargin('-36 0 0 370');
                                            uniC.setWidth(350);
                                            //setar css para combo colaborador
                                            colC.setWidth(350);
                                            colC.setMargin('-36 0 0 0');
                                            //setar css para combo situação
                                            status.setWidth(350);
                                            status.setMargin('-73 0 0 370');
                                            //setar css para combo refrência
                                            mesC.setMargin('-73 0 0 0');
                                            mesC.setWidth(220);
                                            anoC.setMargin('-109 0 0 250');
                                            anoC.setWidth(100);


                                            regC.emptyText = "Sede";
                                            regC.applyEmptyText();
                                        }
                                    } //Fim do botão clique
                            } //fim do botão
                        ]
                    },
                    /*{
                        title: 'Relatórios',
                        iconCls: 'icon-relatorio',
                        id: 'idRel',
                        items: [

                            {
                                xtype: 'splitbutton',
                                width: 147,
                                text: 'Planejamento',
                                id: 'btnRelPlan',
                                menu: [

                                    {
                                        text: 'Planejamentos Não Realizados',
                                        hrefTarget: "_blank",
                                        href: 'https://novoprossiga.inec.org.br/php/Planejamento/Relatorio/PlNRel.php',
                                        id: 'btnPl',
                                        handler: function() {

                                            var btnPl = Ext.getCmp('btnPl');

                                            btnPl.setParams({

                                                local: local,
                                                codreg: codreg,
                                                codund: codund,
                                                niv: niv

                                            });
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'splitbutton',
                                text: 'Prestação',
                                width: 147,
                                id: 'btnRelPres',
                                style: {
                                    margin: '5 0 0 0'
                                },
                                menu: [{
                                    text: 'Prestações Não Realizadas',
                                    hrefTarget: "_blank",
                                    href: 'https://novoprossiga.inec.org.br/php/Prestacao/Relatorio/PrNRel.php',
                                    id: 'btnPr',
                                    handler: function() {

                                        var btnPl = Ext.getCmp('btnPr');

                                        btnPl.setParams({ local: local, codreg: codreg, codund: codund, niv: niv });
                                    }
                                }]
                            },
                            {
                                xtype: 'splitbutton',
                                text: 'Outros',
                                width: 147,
                                id: 'btnOut',
                                style: {
                                    margin: '5 0 0 0'
                                },
                                menu: [
                                    {
                                        text: 'Saldos por local',
                                        hrefTarget: "_blank",
                                        href: 'https://novoprossiga.inec.org.br/php/Relatorios/SaldLoc.php',
                                        id: 'btnOutSld',
                                        handler: function() {

                                            var btnOutSld = Ext.getCmp('btnOutSld');

                                            btnOutSld.setParams({ local: local, codreg: codreg, codund: codund, niv: niv });

                                        }
                                    }
                                ]
                            }
                        ]
                    },*/
                    {
                        title: 'Administração',
                        iconCls: 'icon-admger',
                        id: 'idAdm',
                        items: [

                            {
                                xtype: 'splitbutton',
                                text: 'Administrar Lotes',
                                width: 155,
                                id: 'idgerlot',
                                //iconCls: 'add16',
                                menu: [{
                                        text: 'Gerar Lotes',
                                        listeners: {
                                            click: function() {

                                                Ext.create('desloc.view.ControleLote');
                                            }
                                        }
                                    },
                                    {
                                        text: 'Consultar Lotes',
                                        listeners: {
                                            click: function() {

                                                Ext.create('desloc.view.ConsultarLote');
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                id: 'idlibpr',
                                width: 155,
                                text: 'Liberar Prestação',
                                style: {
                                    margin: '5 0 0 0',
                                    textAlign: 'left'
                                },
                                listeners: {
                                    click: function() {

                                        Ext.create('desloc.view.LibPrestacao');
                                        var sPanelGrid = Ext.getCmp('glipre');
                                        var sStore = sPanelGrid.getStore();
                                        sStore.load();
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                id: 'idgerplan',
                                width: 155,
                                text: 'Controlar Planejamentos',
                                style: {
                                    margin: '5 0 0 0'
                                },
                                listeners: {
                                    click: function() {

                                        Ext.create('desloc.view.AdmPlan');
                                        var regC = Ext.getCmp('regCombo');
                                        var uniC = Ext.getCmp('uniCombo');
                                        var colC = Ext.getCmp('usuCombo');
                                        var status = Ext.getCmp('statusCombo');
                                        var mesC = Ext.getCmp('mesCombo');
                                        var anoC = Ext.getCmp('anoCombo');

                                        regC.setWidth(350);
                                        //setar css para combo unidade
                                        uniC.setMargin('-36 0 0 370');
                                        uniC.setWidth(350);
                                        //setar css para combo colaborador
                                        colC.setWidth(350);
                                        colC.setMargin('-36 0 0 0');
                                        //setar css para combo situação
                                        status.hide();
                                        status.setWidth(350);
                                        status.setMargin('-73 0 0 370');
                                        //setar css para combo refrência
                                        //mesC.hide();
                                        mesC.setMargin('-36 0 0 0');
                                        mesC.setWidth(220);
                                        //anoC.hide();
                                        anoC.setMargin('-73 0 0 250');
                                        anoC.setWidth(100);

                                        //Ext.getCmp('btSairPre').setMargin('0 0 0 -100');

                                        regC.emptyText = "Sede";
                                        regC.applyEmptyText();

                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                id: 'idgerplanreg',
                                width: 154,
                                text: 'Gerenciar Afastamentos',
                                style: {
                                    margin: '5 0 0 0'
                                },
                                listeners: {
                                    click: function() {

                                        Ext.Ajax.request({
                                            url: '/teste2/php/Parametros.php',
                                            params: {
                                                action: 'post'
                                            },
                                            success: function(response) {
                                                result = Ext.JSON.decode(response.responseText);

                                                if (result == 0) {

                                                    Ext.create('desloc.view.AdmPlanReg');
                                                    var regC = Ext.getCmp('regCombo');
                                                    var uniC = Ext.getCmp('uniCombo');
                                                    var colC = Ext.getCmp('usuCombo');
                                                    var status = Ext.getCmp('statusCombo');
                                                    var mesC = Ext.getCmp('mesCombo');
                                                    var anoC = Ext.getCmp('anoCombo');

                                                    //setar css para combo unidade
                                                    //uniC.setMargin('-36 0 0 370');
                                                    uniC.setWidth(320);

                                                    uniC.store.load({
                                                        params: { regId: codreg, codniv: niv }
                                                    });


                                                } else {

                                                    Ext.Msg.alert('Mensagem', 'Acesso permitido somente após o encerramento dos depósitos realizados pelo INEC Sede.');
                                                }

                                            },
                                            failure: function() {

                                                Ext.Msg.alert('Mensagem', 'Problema na base de dados.');
                                            }
                                        });
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                id: 'idgervlr',
                                width: 155,
                                text: 'Gerenciar Valores',
                                style: {
                                    margin: '5 0 0 0'
                                },
                                listeners: {
                                    click: function() {

                                        Ext.create('desloc.view.AdmValores');
                                        var regC = Ext.getCmp('regCombo');
                                        var uniC = Ext.getCmp('uniCombo');
                                        var colC = Ext.getCmp('usuCombo');
                                        var status = Ext.getCmp('statusCombo');
                                        var mesC = Ext.getCmp('mesCombo');
                                        var anoC = Ext.getCmp('anoCombo');


                                        regC.setWidth(350);

                                        if (niv == 1) {

                                            regC.show();
                                        } else {

                                            regC.hide();
                                        }
                                        //setar css para combo unidade
                                        //uniC.setMargin('0 0 0 270');
                                        uniC.setWidth(350);
                                        uniC.setDisabled(false);
                                        //setar css para combo colaborador
                                        colC.setWidth(350);
                                        //colC.setMargin('-36 0 0 0');
                                        //setar css para combo situação
                                        status.hide();
                                        status.setWidth(350);
                                        status.setMargin('-73 0 0 370');
                                        //setar css para combo refrência
                                        //mesC.hide();
                                        mesC.setMargin('0 0 0 0');
                                        mesC.setWidth(220);
                                        //anoC.hide();
                                        anoC.setMargin('-36 0 0 250');
                                        anoC.setWidth(100);

                                        //Ext.getCmp('btSairPre').setMargin('0 0 0 -100');

                                        regC.emptyText = "Sede";
                                        regC.applyEmptyText();

                                        uniC.store.load({
                                            params: { regId: codreg, codniv: niv }
                                        });
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                id: 'iddefpar',
                                width: 155,
                                text: 'Definir Parâmetro',
                                style: {
                                    margin: '5 0 0 0'
                                },
                                listeners: {
                                    click: function() {
                                        Ext.create('desloc.view.DefiParm');
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                id: 'idencdep',
                                width: 155,
                                text: 'Encerrar Depósitos',
                                style: {
                                    margin: '5 0 0 0'
                                },
                                listeners: {
                                    click: function() {
                                        var confBox = Ext.MessageBox;
                                        confBox.buttonText = {
                                            cancel: 'cancelText',
                                            no: 'Não',
                                            ok: 'Ok',
                                            yes: 'Sim'
                                        };

                                        confBox.confirm('Mensagem', 'Deseja realmente encerrar os depósitos?', function(btn, text) {

                                            if (btn == 'yes') {

                                                Ext.Ajax.request({
                                                    url: '/teste2/php/EncDepos.php',
                                                    params: {
                                                        action: 'post'
                                                    },
                                                    success: function(response) {
                                                        result = Ext.JSON.decode(response.responseText);

                                                        if (result == 0) {

                                                            Ext.Msg.alert('Mensagem', 'Depósitos encerrados.');
                                                        } else {

                                                            Ext.Msg.alert('Mensagem', 'Erro ao encerrar os depósitos.');
                                                        }

                                                    },
                                                    failure: function() {

                                                        Ext.Msg.alert('Mensagem', 'Problema na base de dados.');
                                                    }
                                                });

                                            } else {


                                            }

                                        });
                                    }
                                }
                            },
                            {
                                xtype:'button',
                                text: 'Local Adicional',
                                width: 155,
                                id: 'locadd',
                                style: {
                                    margin: '5 0 0 0'
                                },
                                listeners:{
                                    click: function(){

                                        Ext.create('desloc.view.LocalAdicional');
                                    }
                                }
                            },
                            {
                                xtype: 'splitbutton',
                                text: 'Gráficos Gerenciais',
                                width: 155,
                                id: 'idgrager',
                                style: {
                                    margin: '5 0 0 0'
                                },
                                //iconCls: 'add16',
                                menu: [{
                                    text: 'Gastos Mensais',
                                    listeners: {
                                        click: function() {

                                            Ext.create('desloc.view.GrGastMen');
                                        }
                                    }
                                }]
                            }
                        ]
                    },
                    {
                        title: 'Sair',
                        iconCls: 'icon-sair',
                        //id: 'btnSair'
                        items: [{
                            xtype: 'button',
                            id: 'btnSair',
                            width: 147,
                            text: 'Sair',
                            //iconCls: 'icon-sair',
                            handler: function() {

                                Ext.Msg.alert('Mensagem', 'Deseja realmente sair?', function(btn, text) {
                                    if (btn == 'ok') {
                                        var sair = '/teste2/php/sair.php';
                                        window.location = sair;
                                    }
                                });
                            }
                        }]
                    }
                ]
                /*,
                            bbar: [{
                                xtype: 'button',
                                id: 'btnSair',
                                text: 'Sair',
                                iconCls: 'icon-sair',
                                style: {
                                    margin: '0 0 0 100'
                                },
                                handler: function() {

                                    Ext.Msg.alert('Mensagem', 'Deseja realmente sair?', function(btn, text) {
                                        if (btn == 'ok') {
                                            var sair = '/php/sair.php';
                                            window.location = sair;
                                        }
                                    });
                                }
                            }]*/
        },
        {
            region: 'east',
            title: 'Informações do Colaborador',
            //collapsible: true,
            //split: true,
            width: 509,
            items: [{
                    xtype: 'propertygrid', 
                    //title: 'Properties Grid',
                    id: 'propgrid',
                    width: 509,
                    source: {
                        "1 - Matricula:": mat,
                        "2 - Colaborador:": col,
                        "4 - Cargo:": nomcargo,
                        "3 - Local:": local,
                        "5 - Nível:": descniv,
                        "6 - Programa:": descprograma
                            //"7 - Saldo:":sald
                    },
                    //disabled:true
                    listeners: {

                        cellclick: function() {

                            //alert('teste');
                            return false;
                        },
                        beforerender: function() {

                            //var prop = Ext.getCmp('propgrid');
                            //prop.colModel.nameText = "newnamelabel";
                            //prop.colModel.config[0].header = 'newname;
                            var cols = this.getView().getHeaderCt().getGridColumns();
                            cols[0].setText("Nome");
                            cols[1].setText("Descrição");

                        }
                    }
                },
                {
                    xtype: 'panel',
                    id: 'sit',
                    //width: 770,
                    height: 70,
                    title: 'Situação atual do processo',
                    items: [{
                        xtype: 'grid',
                        id: 'gsit',
                        height: 90,
                        autoScroll: true,
                        layout: 'fit',
                        store: Ext.create('desloc.store.SituColS'),
                        columns: [{
                                //header: 'Situação',
                                dataIndex: 'situacao',
                                menuDisabled: true,
                                width: 800,
                                style: {

                                    backgroundColor: '#ffffff',
                                    borderColor: '#ffffff',
                                    textAlign: 'center',
                                    height: 0

                                }
                            }

                        ]
                    }]
                },
                {
                    xtype: 'panel',
                    id: 'histsaldo',
                    //width: 770,
                    //height: 200,
                    title: 'Históricos de saldos',
                    items: [{
                                xtype: 'grid',
                                id: 'histsld',
                                height: 170,
                                autoScroll: true,
                                /*features: [{
                                 ftype: 'summary'
                                }],*/
                                layout: 'fit',
                                store: Ext.create('desloc.store.HistSldoS'),
                                columns: [{
                                        header: 'Referência',
                                        dataIndex: 'datref',
                                        menuDisabled: false,
                                        width: 95
                                    },
                                    {
                                        header: 'Planejado',
                                        dataIndex: 'vlrpla',
                                        menuDisabled: true,
                                        width: 94,
                                        renderer: function(val) {
                                            var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);

                                            if (val.length > 1) {

                                                metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                                            }

                                            return metodo(val);
                                        }
                                    },
                                    {
                                        header: 'Recebido',
                                        dataIndex: 'vlrrec',
                                        menuDisabled: true,
                                        width: 84,
                                        renderer: function(val) {
                                            var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);

                                            if (val.length > 1) {

                                                metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                                            }

                                            return metodo(val);
                                        }
                                    },
                                    {
                                        header: 'Prestação',
                                        dataIndex: 'vlrpre',
                                        menuDisabled: true,
                                        width: 86,
                                        renderer: function(val) {
                                            var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);

                                            if (val.length > 1) {

                                                metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                                            }

                                            return metodo(val);
                                        }
                                    },
                                    {
                                        header: 'Saldo',
                                        dataIndex: 'vlrsld',
                                        menuDisabled: true,
                                        flex: 1,
                                        width: 64,
                                        renderer: function(val) {
                                            var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);

                                            if (val.length > 1) {

                                                metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                                            }

                                            return metodo(val);
                                        }
                                    }
                                ]
                            }

                        ] //final itens
                },
                {
                    xtype: 'panel',
                    id: 'sitsubord',
                    width: 770,
                    height: 300,
                    title: 'Situação da equipe',
                    items: [{
                        xtype: 'grid',
                        id: 'gridsubord',
                        height: 300,
                        autoScroll: true,
                        /*features: [{
                         ftype: 'summary'
                        }],*/
                        layout: 'fit',
                        store: Ext.create('desloc.store.SitSubordS'),
                        columns: [{
                                header: 'Período',
                                dataIndex: 'ref',
                                menuDisabled: true,
                                width: 70
                            },
                            {
                                header: 'Colaborador',
                                dataIndex: 'Colaborador',
                                menuDisabled: false,
                                width: 210
                            },
                            {
                                header: 'Situação',
                                dataIndex: 'situacao',
                                menuDisabled: true,
                                width: 300
                            }

                        ]
                    }]
                }
            ]
        }, {
            region: 'center',
            items: [{

                    xtype: 'image',
                    width: '200px'

                }

            ],
            //html:'<center><img style="width:500;margin-top:-120" src="https://novoprossiga.inec.org.br/resources/images/logounida.png"></center>'
            html: '<center><img style="width:250;height:260;margin-top:-120" src="https://novoprossiga.inec.org.br/resources/images/logos2.png"></center>'
        }
        /*,{
             region: 'north',
             height: 40,
             html: '<img style="width:135px;margin-top: -20px;margin-left:15px;" src="https://novoprossiga.inec.org.br/resources/images/log7.png">',
             items: [{
                 xtype: 'button',
                 id: 'qbtnSair',
                 text: 'Sair',
                 iconCls: 'icon-sair',
                 style: {
                     margin: '5 10 0 1293'
                 },
                 handler: function() {

                     Ext.Msg.alert('Sair', 'Deseja realmente sair?', function(btn, text) {
                         if (btn == 'ok') {
                             var sair = '/php/sair.php';
                             window.location = sair;
                         }
                     });
                 }
             }]

         }*/
    ]
});