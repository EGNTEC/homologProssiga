var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1,
    errorSummary: false
});

Ext.define('desloc.view.cargosGestao.CadPresGestCR', {
    extend: 'Ext.window.Window',
    alias: 'widget.cadpresgestcr',
    title: 'Cadastrar Prestação de Contas',
    iconCls: 'icon-grid',
    width: 990,
    height: 550,
    id: 'cadpresgestcr',
    layout: 'fit',
    closable: true,
    closeAction: 'hide',
    align: 'stretch',
    modal: true,
    resizable: 'true',
    maximizable: 'true',
    //minimizable :'true',
    align: 'center',
    autoShow: true,

    requires: [
        'Ext.selection.CheckboxModel',
        'Ext.selection.CellModel',
        'Ext.util.ComponentDragger',
        'Ext.util.Region',
        'Ext.ux.TextMaskPlugin',
        'Ext.ux.grid.column.ActionButtonColumn',
        'Ext.EventManager',
        'Ext.tab.Panel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.state.*',
        'Ext.form.*'
    ],

    items: [{
            xtype: 'grid',
            id: 'gridprNovGestCR',
            height: 400,
            //selModel: sm,
            selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI'
            },
            layout: 'fit',
            store: Ext.create('desloc.store.cargosGestao.inserirCadPresGestCR'),
            autoScroll: true,
            frame: true,
            features: [{
                ftype: 'summary'
            }],
            tbar: [{
                    xtype: 'label',
                    text: 'Matricula:',
                    style: {

                        fontWeight: 'bold'
                    }
                    //margin: '0 0 0 10'
                },
                {
                    xtype: 'label',
                    id: 'resMatricula'
                },
                {
                    xtype: 'label',
                    text: 'Nome:',
                    style: {

                        fontWeight: 'bold'
                    }
                },
                {
                    xtype: 'label',
                    id: 'resNome'
                },
                {
                    xtype: 'label',
                    text: 'Local:',
                    style: {

                        fontWeight: 'bold'
                    }
                },
                {
                    xtype: 'label',
                    id: 'resLocal'
                },
                {
                    xtype: 'label',
                    text: 'Referência:',
                    style: {

                        fontWeight: 'bold'
                    }
                },
                {
                    xtype: 'label',
                    id: 'resPeriodo'
                }

            ], //fim da barra superioir da grid
            bbar: [
                {
                    text: 'Salvar',
                    id: 'btn_saveCR',
                    iconCls: 'icon-save',
                    listeners: {

                        click: function() {
                            Ext.getCmp('btn_encplanCR').setDisabled(false);
                            Ext.getCmp('btnnovCR').setDisabled(false);
                            var lGrid = Ext.getCmp('gridpreGestCR');
                            var selectedRecords = lGrid.getSelectionModel().getSelection();
                            var vTiptrp = selectedRecords[0].get("tiptrp");
                            var vNumseq = selectedRecords[0].get("numseq");

                            //grid cadastrar prestação
                            var xGrid = Ext.getCmp('gridprNovGestCR');
                            var gStore = xGrid.getStore();
                            var selectedRecords = xGrid.getSelectionModel().getSelection();
                            var vMesRef = selectedRecords[0].get("mesref");

                            parms = [];
                            var updatedRecords = xGrid.getStore().getUpdatedRecords();
                            Ext.each(updatedRecords, function(record) {
                                parms.push(record.data);
                            });

                            Ext.MessageBox.show({
                                msg : 'Salvando dados da prestação...',
                                progressText : 'Salvando dados...',
                                width : 300,
                                wait : true,
                                waitConfig : 
                                {
                                    duration : 20000,
                                    increment : 15,
                                    text : 'Salvando dados...',
                                    scope : this,
                                    fn : function() {
                                        
                                        if (parms.length > 0) {
                                            Ext.Ajax.request({
                                                url: '/teste2/php/Prestacao/updateCadPre.php',
                                                params: {
                                                    action: 'post',
                                                    records: Ext.encode(parms)
                                                },
                                                success: function(response, opts) {
                                                    var result = Ext.JSON.decode(response.responseText);
                                                    //console.log(result);
                                                    if (result == 0) {
            
                                                        Ext.Msg.alert('Mensagem', 'Prestação de contas salva com sucesso.', function(btn, text) {
            
                                                            if (btn == "ok") {
                                                                gStore.load();
                                                            }
                                                        });
                                                    } else
                                                    if (result == 1) {
            
                                                        Ext.getCmp('btn_encplanCR').setDisabled(true);
                                                        Ext.getCmp('btnnovCR').setDisabled(true);
                                                        Ext.Msg.alert('Mensagem', 'Existe(m) dia(s) preenchido(s) incorretamente.');
                                                    } else
                                                    if (result == 2) {
            
                                                        Ext.getCmp('btn_encplanCR').setDisabled(true);
                                                        Ext.getCmp('btnnovCR').setDisabled(true);
                                                        Ext.Msg.alert('Mensagem', 'Existe dia com valor negativo.');
                                                    } else {
                                                        Ext.getCmp('btn_encplanCR').setDisabled(true);
                                                        Ext.getCmp('btnnovCR').setDisabled(true);
                                                        Ext.Msg.alert('Mensagem', 'Erro ao atualizar registros.');
                                                        gStore.load();
                                                    }
                                                },
                                                failure: function() {
            
                                                    gStore.load();
                                                }
            
                                            });
                                        }
                                    }
                                }
                             });

                            //========================================================
                            //Insert ao salvar
                            Ext.apply(gStore.getProxy().extraParams, {
                                numseq: vNumseq,
                                tiptrp: vTiptrp,
                                mesref: vMesRef
                            });

                            gStore.sync({
                                success: function(conn, response, options, eOpts) {
                                    var result = Ext.JSON.decode(conn.responseText, true);
                                    //console.log(result);
                                    if (!result) { // caso seja null
                                        result = {};
                                        result.success = true;
                                    }

                                    if (result.success) {

                                        Ext.Msg.alert('Mensagem', 'Registo inserido com sucesso!', function(btn, text) {

                                            if (btn == "ok") {

                                                gStore.load();

                                            }
                                        });
                                    } else {
                                        Ext.Msg.alert('Mensagem', 'Erro ao inserir registro!');
                                        gStore.load();
                                    }
                                },
                                failure: function() {

                                    Ext.Msg.alert('Mensagem', 'Erro ao inserir registro!');
                                    gStore.load();
                                }
                            });
                        }
                    } //Fim do listeners
                },
                {
                    xtype: 'button',
                    id: 'btn_encplanCR',
                    name: 'btn_encplanCR',
                    text: 'Finalizar', //O botão Fechar será renomeado para Finalizar
                    iconCls: 'icon-fechar',
                    handler: function() {

                            var qGrid = Ext.getCmp('gridpreGestCR');
                            var sStore = qGrid.getStore();
                            var selectedRecords = qGrid.getSelectionModel().getSelection();
                            var vSituacao = selectedRecords[0].get("dessts");
                            vIdAbrt = selectedRecords[0].get("numseq");
                            var comboSts = Ext.getCmp('statusCombo');
                            var tiptrp = selectedRecords[0].get("tiptrp");
                            var vlrpre = selectedRecords[0].get("vlrpre");
                            var jusprest = selectedRecords[0].get("juspre");

                            Ext.MessageBox.show({
                                msg : 'Finalizando..',
                                progressText : 'Finalizando prestação...',
                                width : 300,
                                wait : true,
                                waitConfig : 
                                {
                                    duration : 20000,
                                    increment : 15,
                                    text : 'Finalizando prestação...',
                                    scope : this,
                                    fn : function() {

                                        Ext.Ajax.request({
                                            url: '/teste2/php/Prestacao/updBtnEnc.php',
                                            params: {
                                                action: 'post',
                                                tiptrp: tiptrp,
                                                id: vIdAbrt
                                                    //vlrpre:vlrpre
                                            },
                                            success: function(response) {
                                                var result = Ext.JSON.decode(response.responseText);
                                                //console.log(result);
                                                if (result == 0) {
            
                                                    Ext.Msg.alert('Mensagem', 'Existem dias com valor total zerado.', function(btn, text) {
            
                                                        if (btn == "ok") {
            
                                                            Ext.getCmp('btn_encplanCR').setDisabled(false);
                                                        }
                                                    });
            
                                                } else
                                                if (result == 1) {
            
                                                    Ext.Msg.alert('Mensagem', 'O valor total da prestação de contas é superior ao limite permitido. Justifique!', function(btn, text) {
            
                                                        if (btn == "ok") {
                                                            Ext.create('desloc.view.JustificativaTeto');
                                                        }
                                                    });
                                                    Ext.getCmp('btn_encplanCR').setDisabled(true);
            
                                                } else
                                                if (result == 2) {
                                                    Ext.Msg.alert('Mensagem', 'Prestação de contas finalizada com sucesso.');
                                                    Ext.getCmp('btn_encplanCR').setDisabled(true);
                                                    
                                                    sStore.load({
                                                        params: {
                                                            sts: comboSts.getValue(),
                                                            mat: Ext.getCmp('usuCombo').getValue(),
                                                            btn: 0
                                                        }
                                                    });
                                                    Ext.getCmp('cadpresgestcr').destroy(true);
            
                                                } else
                                                if (result == 3) {
            
                                                    var confBox = Ext.MessageBox;
            
                                                    confBox.buttonText = {
                                                        cancel: 'cancelText',
                                                        no: 'Não',
                                                        ok: 'Ok',
                                                        yes: 'Sim'
                                                    };
            
                                                    Ext.Msg.show({
                                                        title: 'Mensagem',
                                                        msg: 'O valor total da prestação está zerado, Deseja continuar?',
                                                        buttons: Ext.MessageBox.YESNO,
                                                        closable: false,
                                                        icon: Ext.MessageBox.WARNING,
                                                        fn: function(btn, text){
                                                            if(btn == 'yes'){
                                                                Ext.Ajax.request({
            
                                                                    url: '/teste2/php/Prestacao/EncPrest.php',
                                                                    params: {
                                                                        action: 'post',
                                                                        id: vIdAbrt
                                                                    },
                                                                    success: function(response) {
                                                                        var result = Ext.JSON.decode(response.responseText);
            
                                                                        if(result == 0){
            
                                                                            Ext.Msg.alert('Mensagem', 'Prestação de contas finalizada com sucesso.');
                                                                        }else{
                                                                            Ext.Msg.alert('Mensagem', 'Erro ao cadastrar a prestação.');
            
                                                                        }
                                                                    }
                                                                });
                                                            }else
                                                             if(btn=='no'){}
                                                         }
                                                    });
                                                    
                                                    Ext.getCmp('btn_encplanCR').setDisabled(true);
                                                }else
                                                 if(result == 4){
            
                                                    Ext.Msg.alert('Mensagem', 'Algo de errado aconteceu, por gentileza tente novamente.');
                                                }
                                            },
                                            failure: function() {
                                                Ext.Msg.alert('Mensagem', 'Problemas na base!');
                                                sStore.load({
                                                    params: {
                                                        sts: comboSts.getValue()
                                                    }
                                                });
                                            }
                                        });                                        
                                    }
                                }
                             });                            

                        } //fim da função click
                },
                {
                    text: 'Deslocamento Adicional',
                    iconCls: 'icon-moedas',
                    //disabled:true,
                    tooltip: 'Cadastrar deslocamento adicional',
                    id: 'btnnovCR',
                    listeners: {
                        click: function() {
                            valcombo = 0;

                            var xGrid = Ext.getCmp('gridprNovGestCR');
                            var selectedRecords = xGrid.getSelectionModel().getSelection();

                            Tnumseq = 0;
                            Btn = 1; // valor para o botão quando for adicional.

                            var teste = Ext.getCmp('novoValor');
                            var qtdpsg = Ext.getCmp('qtdpsg');
                            var valpsg = Ext.getCmp('valpsg');
                            var hdini = Ext.getCmp('hdini');
                            var hdfim = Ext.getCmp('hdfim');
                            //var vlrtot = Ext.getCmp('vlrtot');
                            var vlrad = Ext.getCmp('vlrad');
                            //var tiptra = Ext.getCmp('tiptra');
                            dt = '0/00/0000';

                            var qGrid = Ext.getCmp('gridpreGestCR');
                            var selectedRecord = qGrid.getSelectionModel().getSelection();
                            var Vtiptrp = vTiptrp; //selectedRecord[0].get("tiptrp");
                            var id = vSeqpla; //selectedRecord[0].get("numseq");
                            var vMesRef = vMesRef;
                            var vNumcad = vNumcad;

                            Ext.create('desloc.view.outrosValoresMot');

                        }
                    }
                },
                /*{
                    xtype: 'button',
                    text: 'Arquivo de Prestação',
                    id: 'btn_arqprest',
                    name: 'btn_arqprest',
                    //hrefTarget : "_blank",
                    href: 'https://novoprossiga.inec.org.br/teste2/php/Prestacao/ArqPrest.php',
                    iconCls: 'icon-prest',
                    handler: function() {
                        var sPanelGrid = Ext.getCmp('gridpre');
                        var sStore = sPanelGrid.getStore();
                        var selectedRecords = sPanelGrid.getSelectionModel().getSelection();
                        var btn = Ext.getCmp('btn_arqprest');

                        vId = selectedRecords[0].get("numseq");
                        vMat = selectedRecords[0].get("numcad");
                        vIdtrans = selectedRecords[0].get("tiptrp");
                        vNom = selectedRecords[0].get("nomfun");
                        vIdpla = selectedRecords[0].get("seqpla");
                        vTotkm = selectedRecords[0].get("qtdkm");
                        vTotpre = selectedRecords[0].get("vlrpre");
                        vMesref = selectedRecords[0].get("mesref");

                        btn.setParams({ id: vId, mat: vMat, idtrans: vIdtrans, nom: vNom, idpla: vIdpla, qtdkm: vTotkm, totpre: vTotpre, mesref: vMesref, colaborador: col, cargo: nomcargo });
                    }
                },*/
                {
                    text: 'Sair',
                    iconCls: 'icon-sair',
                    listeners: {
                        click: function() {

                            //Tratamento ao fechar janela de cadastro de planejamento,
                            //o reload da grid de abertura deve obedecer o valor da
                            //situação.
                            var xGrid = Ext.getCmp('gridpreGestCR');
                            var selectedRecords = xGrid.getSelectionModel().getSelection();
                            var xStore = xGrid.getStore();
                            var situacao = Ext.getCmp('statusCombo').getValue();
                            var usu = Ext.getCmp('usuCombo').getValue();
                            var comboUso = Ext.getCmp('usuCombo');
                            var comboUnid = Ext.getCmp('uniCombo');
                            var comboReg = Ext.getCmp('regCombo');
                            var comboSts = Ext.getCmp('statusCombo');
                            var comboStatus = comboSts.getValue();
                            var comboMes = Ext.getCmp('mesCombo').getValue();
                            var comboAno = Ext.getCmp('anoCombo').getValue();

                            xStore.load({
                                params: {
                                    mat: usu,
                                    btn: 0,
                                    sts: comboSts.getValue()
                                }
                            });

                            Ext.getCmp('cadpresgestcr').destroy();
                        }
                    }
                }

            ], //fim da barra inferior da grid
            columns: [

                {
                    header: 'Id',
                    id: 'numseqNovCR',
                    name: 'numseqNovCR',
                    dataIndex: 'numseq',
                    hidden: true,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Id Abertura',
                    id: 'seqpreNovCR',
                    name: 'seqpreNovCR',
                    dataIndex: 'seqpre',
                    hidden: true,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    id: 'numevtNovCR',
                    name: 'numevtNovCR',
                    dataIndex: 'numevt',
                    hidden: true
                },
                {
                    xtype: 'datecolumn',
                    header: 'Data',
                    id: 'datpreNovCR',
                    align: 'center',
                    menuDisabled: true,
                    name: 'datpreNovCR',
                    dataIndex: 'datpre',
                    width: 130,
                    style: {

                        borderColor: '#F5F5F5',
                        textAlign: 'center'

                    },
                    hoverCls: 'black',
                    renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                    summaryRenderer: function() {
                        return 'Total:'
                    }
                },
                {
                    header: 'Transporte',
                    dataIndex: 'destrp',
                    align: 'center',
                    width: 135,
                    menuDisabled: true,
                    id: 'destrpNovCR',
                    style: {

                        borderColor: '#F5F5F5',
                        textAlign: 'center'
                    },
                    hoverCls: 'black',
                    editor: {
                        xtype: 'combo',
                        editable: false,
                        width: 120,
                        id: 'tiptrpNovCR',
                        emptyText: 'Selecione o Transporte',
                        store: Ext.create('desloc.store.TipoTransS'),
                        displayField: 'destrp',
                        valueField: 'destrp', //tiptrp
                        triggerAction: 'all',
                        mode: 'local',
                        lastQuery: '',
                        listeners: {
                            change: function() {

                                //grid abrir prestação
                                var lGrid = Ext.getCmp('gridprNovGestCR');
                                var lStore = lGrid.getStore();
                                var selectedRecords = lGrid.getSelectionModel().getSelection();
                                var models = lGrid.getStore().getRange();
                                var rowSelected = lGrid.view.getSelectionModel().getCurrentPosition().row;
                                var fimVlr = selectedRecords[0].get("odofim");
                                var iniVlr = selectedRecords[0].get("odoini");
                                var jusVlr = selectedRecords[0].get("juspre");
                                var kmVlr = selectedRecords[0].get("quilometro");
                                var vldesVlr = selectedRecords[0].get("vlrdes");
                                var datpre = selectedRecords[0].get("datpre");
                                var Vtiptrp = Ext.getCmp('tiptrpNovCR').getValue();
                                var vOdoini = Ext.getCmp('hodiniNovCR');
                                var vOdofim = Ext.getCmp('hodfimNovCR');
                                var vSeqpre = selectedRecords[0].get("seqpre");
                                var vdestrp = selectedRecords[0].get("destrp");
                                galtTrp = Vtiptrp;

                                //Tratamento para resgatar o valor do transporte
                                Ext.Ajax.request({
                                    url: '/teste2/php/ValorKm.php',
                                    params: {
                                        action: 'post',
                                        tipTrp: Vtiptrp,
                                        datpres: datpre
                                    },
                                    success: function(response) {
                                        var result = Ext.JSON.decode(response.responseText);
                                        g_Vtrp = result; //variavel global valor do quilometro.

                                    },
                                    failure: function() {

                                        //Ext.Msg.alert('Msg','Problema Na Base de Dados!');
                                    }
                                });

                                //Fim do tratamento

                                //Tratamento para verificar se existe para o dia
                                //seleciionado existe prestação cadastrada.

                                Ext.Ajax.request({
                                    url: '/teste2/php/ExistPre.php',
                                    params: {
                                        action: 'post',
                                        tipTrp: Vtiptrp,
                                        data: datpre,
                                        seqpre: vSeqpre

                                    },
                                    success: function(response) {
                                        var result = Ext.JSON.decode(response.responseText);

                                        if (Vtiptrp == 'Coletivo') {

                                            selectedRecords[0].set("Coluna1", 'Qtd. Passagem:');
                                            selectedRecords[0].set("Coluna2", 'Vlr. Passagem:');

                                        } else {

                                            selectedRecords[0].set("Coluna1", 'Km Inicial:');
                                            selectedRecords[0].set("Coluna2", 'Km Final:');
                                        }

                                        if (gtrpd != Vtiptrp) {

                                            if (result == 0) {
                                                //Tratamento para evitar que tenha alteração do transporte
                                                //para valores adicionais.
                                                if (Vtiptrp == 'Coletivo') {
                                                    Ext.getCmp('tiptrpNovCR').setValue('Proprio');
                                                } else {
                                                    Ext.getCmp('tiptrpNovCR').setValue('Coletivo');
                                                }

                                                selectedRecords[0].set("quilometro", gkm);
                                                selectedRecords[0].set("vlrdes", gvlt);
                                                selectedRecords[0].set("odoini", goni);
                                                selectedRecords[0].set("odofim", gfim);
                                                selectedRecords[0].set("juspre", gjus);

                                            } else {

                                                selectedRecords[0].set("odoini", 0);
                                                selectedRecords[0].set("odofim", 0);
                                                selectedRecords[0].set("quilometro", 0);
                                                selectedRecords[0].set("vlrdes", 0);
                                                selectedRecords[0].set("juspre", '');

                                                vOdoini.setValue(0);
                                                vOdofim.setValue(0);

                                            }
                                        }
                                    },
                                    failure: function() {

                                        //Ext.Msg.alert('Msg','Problema Na Base de Dados!');
                                    }
                                });
                                //Fim do tratamento

                            }, //Final do change dragon
                            specialkey: function(field, e) {

                                var Jgrid = Ext.getCmp('gridprNovGestCR');
                                var sStore = Jgrid.getStore();
                                var selectedRecords = Jgrid.getSelectionModel().getSelection();
                                var rowSelected = Jgrid.view.getSelectionModel().getCurrentPosition().row;
                                var vTransp = selectedRecords[0].get('destrp');
                                var vVlr = selectedRecords[0].get('vlrdes');

                                var models = Jgrid.getStore().getRange();

                                var Oini = models[rowSelected].get("odoini");
                                var Ofim = models[rowSelected].get("odofim");

                                var rowS = rowSelected - 1;
                                //var numevt  = models[rowS].get("numevt");

                                if (e.getKey() == 9 && e.shiftKey) {
                                    //return false;
                                }

                                if (e.getKey() == 27) {
                                    //return false;
                                    Ext.getCmp('cadpresgestcr').close();
                                }

                                switch (e.getKey()) {

                                    case e.TAB:

                                        if (vTransp == "Coletivo") {

                                            if ((Ofim != 0 && Oini == 0) || (Ofim == 0 && Oini != 0)) {

                                                models[rowSelected].set("quilometro", 0);
                                                models[rowSelected].set("vlrdes", 0);
                                                models[rowSelected].set("odoini", 0);
                                                selectedRecords[0].set("odofim", 0);
                                            }
                                            var Total = parseInt(Oini) * parseFloat(Ofim);
                                            selectedRecords[0].set("vlrdes", parseFloat(Total));
                                        }

                                        break;

                                    case e.ENTER:
                                        //e.keyCode = e.TAB;
                                        if (vTransp == "Coletivo") {

                                            if ((Ofim != 0 && Oini == 0) || (Ofim == 0 && Oini != 0)) {

                                                models[rowSelected].set("quilometro", 0);
                                                models[rowSelected].set("vlrdes", 0);
                                                models[rowSelected].set("odoini", 0);
                                                models[rowSelected].set("odofim", 0);
                                                models[rowSelected].set("juspre", '');
                                            }

                                            var Total = parseInt(Oini) * parseFloat(Ofim);
                                            selectedRecords[0].set("vlrdes", parseFloat(Total));
                                        }

                                        break;
                                }

                            }, //fim do special
                            blur: function() {

                                    var Jgrid = Ext.getCmp('gridprNovGestCR');
                                    var sStore = Jgrid.getStore();
                                    var selectedRecords = Jgrid.getSelectionModel().getSelection();
                                    var rowSelected = Jgrid.view.getSelectionModel().getCurrentPosition().row;
                                    var vTransp = selectedRecords[0].get('destrp');
                                    //var vOdofim   = Ext.getCmp('hodfimNov').getValue();
                                    var vOdofimC = Ext.getCmp('hodfimNovCR');

                                    var models = Jgrid.getStore().getRange();

                                    var Oini = selectedRecords[0].get("odoini");
                                    var Ofim = selectedRecords[0].get("odofim");
                                    var vVlr = selectedRecords[0].get('vlrdes');
                                    var jusVlr = selectedRecords[0].get("juspre");
                                    var kmVlr = selectedRecords[0].get("quilometro");

                                    if (g_TrpAnt == "Coletivo") {

                                        if ((g_vOdfim == 0 && g_vOdini != 0) || (g_vOdfim != 0 && g_vOdini == 0)) {

                                            models[g_RowAnt].set("quilometro", 0);
                                            models[g_RowAnt].set("vlrdes", 0);
                                            models[g_RowAnt].set("odoini", 0);
                                            models[g_RowAnt].set("odofim", 0);

                                            g_RowAnt = 0;
                                            g_vOdini = 0;
                                            g_TrpAnt = 0;
                                        }
                                        //}

                                        var Total = parseInt(g_vOdini) * parseFloat(g_vOdfim);
                                        models[g_RowAnt].set("vlrdes", parseFloat(Total));
                                    }
                                }, //Fim do blur                                
                            focus: function() {

                                var grid = Ext.getCmp('gridprNovGestCR');
                                var selectedRecords = grid.getSelectionModel().getSelection();
                                var rowSelected = grid.view.getSelectionModel().getCurrentPosition().row;
                                var models = grid.getStore().getRange();
                                var numevt = selectedRecords[0].get("numevt");

                                var Oini = selectedRecords[0].get("odoini");
                                var Ofim = selectedRecords[0].get("odofim");
                                var vVlr = selectedRecords[0].get('vlrdes');
                                var jusVlr = selectedRecords[0].get("juspre");
                                var kmVlr = selectedRecords[0].get("quilometro");
                                var vTrpDia = selectedRecords[0].get("destrp");
                                var Vtiptrp = Ext.getCmp('tiptrpNovCR').getValue();

                                //variaveis anteriores
                                goni = Oini;
                                gfim = Ofim;
                                gvlt = vVlr;
                                gkm = kmVlr;
                                gjus = jusVlr;
                                gtrpd = vTrpDia;

                                //alert(gtrpd);

                                if ((g_vOdfim == 0 && g_vOdini != 0) || (g_vOdfim != 0 && g_vOdini == 0)) {

                                    models[g_RowAnt].set("quilometro", 0);
                                    models[g_RowAnt].set("vlrdes", 0);
                                    models[g_RowAnt].set("odoini", 0);
                                    models[g_RowAnt].set("odofim", 0);

                                    //g_RowAnt =0;
                                    g_vOdini = 0;
                                    g_TrpAnt = 0;
                                }

                                if (numevt == 2) {
                                    Ext.Msg.alert('Mensagem', 'Valores adicionais não podem ser editados.');
                                }
                            }
                        } //Fim do listeners
                    }
                },
                {
                    //header:'D',
                    width: 120,
                    dataIndex: 'Coluna1',
                    align: 'right',
                    id: 'EstHodIniQtdNovCR',
                    menuDisabled: true,
                    style: {

                        borderColor: '#F5F5F5'
                    },
                    hoverCls: 'black'
                },
                {
                    xtype: 'numbercolumn',
                    //header: 'E',
                    align: 'center',
                    dataIndex: 'odoini',
                    width: 69,
                    id: 'odoiniNovCR',
                    name: 'odoiniNovCR',
                    menuDisabled: true,
                    style: {

                        borderColor: '#F5F5F5'
                    },
                    hoverCls: 'black',
                    editor: {
                        xtype: 'numberfield',
                        id: 'hodiniNovCR',
                        anchor: '100%',
                        enableKeyEvents: true,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        minValue: 0,
                        allowBlank: false,
                        selectOnFocus: true,
                        listeners: {
                            change: function(field, value) {
                                value = parseInt(value, 10);
                                field.setValue(value);
                            },
                            keyup: function(field, value) {

                                var lGrid = Ext.getCmp('gridpreGestCR');
                                var selectedRecords1 = lGrid.getSelectionModel().getSelection();
                                var vValtrp = selectedRecords1[0].get("vlrtrp");

                                var sPanelGrid = Ext.getCmp('gridprNovGestCR');
                                var sStore = sPanelGrid.getStore();
                                var selectedRecords = sPanelGrid.getSelectionModel().getSelection();
                                var Ofim = selectedRecords[0].get('odofim');
                                var Oini = selectedRecords[0].get('odoini');
                                var vTrans = selectedRecords[0].get('destrp');
                                var vQtkm = Ext.getCmp('hodiniNovCR').getValue();
                                //var vValpas= Ext.getCmp('hodfimNov').getValue();
                                var vQtkmE = Ext.getCmp('hodiniNovCR');
                                var vVlr = selectedRecords[0].get('vlrdes');
                                var rowSelected = sPanelGrid.view.getSelectionModel().getCurrentPosition().row;
                                var DescC = Ext.getCmp('descNovCR');
                                //var DescE = Ext.getCmp('descNov').getValue();
                                var Desc = selectedRecords[0].get('juspre');

                                //Ext.getCmp('tiptrpNov').setEditable(false);

                                if (vQtkm < 0) {

                                    vQtkm = vQtkm * (-1);
                                    field.setValue(vQtkm);
                                }

                                //Tratamento para cálculo ao digitar(valor do transporte).
                                if (vTrans == "Proprio") {

                                    if (vValtrp == 0 || vValtrp == "" || vValtrp === null) {

                                        vValtrp = g_Vtrp;
                                    } else {

                                        vValtrp = vValtrp;
                                    }
                                } else {

                                    vValtrp = vValtrp;
                                }

                                g_vOdini = vQtkm; //Oini
                                g_vOdiniEd = Oini;
                                g_VEdIni = vQtkmE;
                                g_vOdfim = Ofim; //vOdofim
                                //g_vOdfimEd = vValpas;
                                g_VlrAnt = vVlr;
                                g_RowAnt = rowSelected;
                                g_TrpAnt = vTrans;
                                g_Desc = Desc;
                                g_DescE = Desc; //g_DescE  = DescE;
                                g_DescCmp = DescC;

                                if (g_vOdini == null) {

                                    g_vOdini = 0;
                                }

                                if (vTrans == "Proprio") {

                                    if (Ofim < vQtkm && Ofim != 0) {

                                        vQtkmE.setValue(0);
                                        selectedRecords[0].set("odofim", 0);
                                        selectedRecords[0].set("quilometro", 0);

                                        function showResults(btn) {

                                            if (btn == 'ok') {

                                                selectedRecords[0].set("quilometro", 0);
                                                selectedRecords[0].set("vlrdes", 0);
                                                selectedRecords[0].set('juspre', '');

                                                g_vOdfim = 0;
                                                g_vOdini = 0;
                                                g_TrpAnt = 0;
                                            }
                                        }

                                        Ext.Msg.show({
                                            title: 'Mensagem',
                                            msg: 'O hodometro final é menor que o inicial.',
                                            buttons: Ext.Msg.OK,
                                            closable: false,
                                            fn: showResults
                                        });
                                    }
                                }
                                //Tratamento para cálculo do valor do transporte

                                if (vTrans == "Proprio") { //cálculo para transporte Proprio.

                                    if (Ofim === null || Ofim == 0) {
                                        
                                    } else {


                                        var KM = parseInt(Ofim) - parseInt(vQtkm);
                                        selectedRecords[0].set("quilometro", parseInt(KM));

                                        var Total = parseInt(KM) * parseFloat(vValtrp);
                                        selectedRecords[0].set("vlrdes", parseFloat(Total));
                                    }

                                } else { //cálculo para transporte coletivo.

                                    var Total = parseInt(vQtkm) * parseFloat(Ofim);
                                    selectedRecords[0].set("vlrdes", parseFloat(Total));

                                }
                            }, //Fim do Keyup
                            specialkey: function(field, e) {

                                    var lGrid = Ext.getCmp('gridpreGestCR');
                                    var selectedRecords1 = lGrid.getSelectionModel().getSelection();
                                    var vValtrp = selectedRecords1[0].get("vlrtrp");

                                    var sPanelGrid = Ext.getCmp('gridprNovGestCR');
                                    var sStore = sPanelGrid.getStore();
                                    var selectedRecords = sPanelGrid.getSelectionModel().getSelection();

                                    var Ofim = selectedRecords[0].get('odofim');
                                    var Oini = selectedRecords[0].get('odoini');
                                    var vOdofimC = Ext.getCmp('hodfimNovCR');
                                    var vTrans = selectedRecords[0].get('destrp');
                                    var vQtkm = Ext.getCmp('hodiniNovCR').getValue();
                                    var vQtkmC = Ext.getCmp('hodiniNovCR');
                                    var vVlr = selectedRecords[0].get('vlrdes');

                                    //var models  = Jgrid.getStore().getRange();

                                    if (e.getKey() == 27) {
                                        //return false;
                                        Ext.getCmp('cadpresgestcr').close();
                                    }

                                    switch (e.getKey()) {

                                        case e.TAB:

                                            if (vTrans == "Proprio") {

                                                var km = parseInt(Ofim) - parseInt(vQtkm);
                                                var Total = parseInt(km) * parseFloat(vValtrp);
                                                selectedRecords[0].set("vlrdes", parseFloat(Total));
                                                selectedRecords[0].set("quilometro", km);

                                            } else {

                                                if (vQtkm == 0 && (vOdofimC != 0 || Ofim != 0)) { //(vQtkm > 0 && Ofim == 0) ||

                                                    selectedRecords[0].set("quilometro", 0);
                                                    selectedRecords[0].set("vlrdes", 0);
                                                    selectedRecords[0].set("odoini", 0);
                                                    selectedRecords[0].set("odofim", 0);
                                                }

                                                var Total = parseInt(vQtkm) * parseFloat(Ofim);
                                                selectedRecords[0].set("vlrdes", parseFloat(Total));
                                            }

                                            break;

                                        case e.ENTER:

                                            break;
                                    }

                                } //Fim Specialkey
                                ,
                            blur: function() {

                                    var lGrid = Ext.getCmp('gridpreGestCR');
                                    var selectedRecords1 = lGrid.getSelectionModel().getSelection();
                                    var vValtrp = selectedRecords1[0].get("vlrtrp");

                                    var sPanelGrid = Ext.getCmp('gridprNovGestCR');
                                    var sStore = sPanelGrid.getStore();
                                    var selectedRecords = sPanelGrid.getSelectionModel().getSelection();
                                    var rowSelected = sPanelGrid.view.getSelectionModel().getCurrentPosition().row;

                                    var Ofim = selectedRecords[0].get('odofim');
                                    var Oini = selectedRecords[0].get('odoini');
                                    var vOdofimC = Ext.getCmp('hodfimNovCR');
                                    var vTrans = selectedRecords[0].get('destrp');
                                    var vQtkm = Ext.getCmp('hodiniNovCR').getValue();
                                    var vQtkmC = Ext.getCmp('hodiniNovCR');
                                    var vVlr = selectedRecords[0].get('vlrdes');

                                    var models = sPanelGrid.getStore().getRange();

                                    if (g_TrpAnt == "Proprio") {

                                        if (g_vOdini == null && g_vOdfim != 0) {

                                            var km = parseInt(g_vOdfim) - parseFloat(g_vOdiniEd);
                                            var Total = parseInt(km) * parseFloat(vValtrp);
                                            models[g_RowAnt].set("vlrdes", parseFloat(Total));
                                            models[g_RowAnt].set("quilometro", km);

                                            g_vOdini = 0;
                                            //g_RowAnt  =0;
                                            g_vOdiniEd = 0;
                                            g_vOdfim = 0;

                                        }

                                    } else { //COLETIVO                                        

                                        if (g_vOdini == null && g_vOdfim != 0) {

                                            var Total = parseInt(g_vOdiniEd) * parseFloat(g_vOdfim);
                                            models[g_RowAnt].set("vlrdes", parseFloat(Total));

                                            g_vOdini = 0;
                                            g_RowAnt = 0;
                                            g_vOdiniEd = 0;
                                            g_vOdfim = 0;
                                        }                                        
                                    }
                                } //Fim do blur
                            ,
                            delay: 1
                        }
                    },
                    renderer: function(val) {
                        var met = Ext.util.Format.maskRenderer('', true);

                        if (val.length > 1) {

                            met = Ext.util.Format.maskRenderer('', true);
                        }

                        return met(val);
                    }
                },
                {
                    //header:'F',
                    width: 120,
                    dataIndex: 'Coluna2',
                    align: 'right',
                    id: 'EstHodFimVlrNovCR',
                    menuDisabled: true,
                    style: {

                        borderColor: '#F5F5F5'
                    },
                    hoverCls: 'black'

                },
                {
                    //xtype: 'numbercolumn',
                    //header: 'G',
                    width: 69,
                    align: 'center',
                    dataIndex: 'odofim',
                    id: 'odofimNovCR',
                    name: 'odofimNovCR',
                    menuDisabled: true,
                    style: {

                        borderColor: '#F5F5F5'
                    },
                    hoverCls: 'black',
                    editor: {
                        xtype: 'numberfield',
                        id: 'hodfimNovCR',
                        enableKeyEvents: true,
                        mouseWheelEnabled: false,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        minValue: 0,
                        selectOnFocus: true,
                        listeners: {
                            focus: function() {

                                var grid = Ext.getCmp('gridprNovGestCR');
                                var rowSelected = grid.view.getSelectionModel().getCurrentPosition().row;
                                var selectedRecords = grid.getSelectionModel().getSelection();
                                
                            },
                            change: function(field, value) {
                                var grid = Ext.getCmp('gridprNovGestCR');
                                var sStore = grid.getStore();
                                var selectedRecords = grid.getSelectionModel().getSelection();
                                var vTrans = selectedRecords[0].get('destrp');
                                var vVlr = selectedRecords[0].get('vlrdes');

                                if (vTrans == 1 || vTrans == "Proprio") {

                                    value = parseInt(value, 10);
                                    field.setValue(value);

                                    //selectedRecords[0].set("vlrdes",0);
                                }

                            },
                            keyup: function(field, value) {

                                //grid abrir prestação
                                var lGrid = Ext.getCmp('gridpreGestCR');
                                var selectedRecords = lGrid.getSelectionModel().getSelection();
                                var vValtrp = selectedRecords[0].get("vlrtrp");
                                var vTiptrp = selectedRecords[0].get("tiptrp");
                                var vDatpla = selectedRecords[0].get("mesref");
                                var vNumcad = selectedRecords[0].get("numcad");

                                //grid cadastro de prestação
                                var grid = Ext.getCmp('gridprNovGestCR');
                                var sStore = grid.getStore();
                                var selectedRecords = grid.getSelectionModel().getSelection();
                                var rowSelected = grid.view.getSelectionModel().getCurrentPosition().row;

                                var vVlr = selectedRecords[0].get('vlrdes');
                                var vTrans = selectedRecords[0].get('destrp');
                                var Oini = selectedRecords[0].get('odoini');
                                var Ofim = selectedRecords[0].get('odofim');

                                var vOdofim = Ext.getCmp('hodfimNovCR').getValue();
                                var vOdofimC = Ext.getCmp('hodfimNovCR');
                                var DescC = Ext.getCmp('descNovCR');
                                //var DescE = Ext.getCmp('descNov').getValue();
                                var Desc = selectedRecords[0].get('juspre');

                                //alert(vOdofim);
                                //Tratamento para cálculo ao digitar(valor do transporte).
                                if (vTrans == "Proprio") {

                                    if (vValtrp == 0 || vValtrp == "" || vValtrp === null) {

                                        vValtrp = g_Vtrp;
                                    } else {

                                        vValtrp = vValtrp;
                                    }
                                } else {

                                    vValtrp = vValtrp;
                                }

                                g_vOdini = Oini;
                                g_vOdfim = vOdofim;
                                g_VlrAnt = vVlr;
                                g_RowAnt = rowSelected;
                                g_TrpAnt = vTrans;
                                g_VEdFim = vOdofimC;
                                g_vOdfimEd = Ofim;
                                g_Desc = Desc;
                                g_DescE = Desc; //g_DescE  = DescE;
                                g_DescCmp = DescC;


                                if (g_vOdfim == null) {

                                    g_vOdfim = 0;
                                }

                                if (vOdofim < 0) {

                                    field.setValue(0);
                                    selectedRecords[0].set("odoini", 0);

                                    function showResult(btn) {

                                        if (btn == 'ok') {

                                            selectedRecords[0].set("vlrdes", 0);
                                            g_vOdfim = 0;
                                            g_vOdini = 0;
                                            g_TrpAnt = 0;
                                        }
                                    }

                                    Ext.Msg.show({
                                        title: 'Mensagem',
                                        msg: 'Não é permitido cadastrar valor negativo.',
                                        buttons: Ext.Msg.OK,
                                        closable: false,
                                        fn: showResult
                                    });
                                }

                                if (vTrans == "Proprio") { //cálculo para transporte Proprio.
                                    
                                    var KM = parseInt(vOdofim) - parseInt(Oini);
                                    selectedRecords[0].set("quilometro", parseInt(KM));

                                    var Total = parseInt(KM) * parseFloat(vValtrp);
                                    selectedRecords[0].set("vlrdes", parseFloat(Total));

                                    if (vOdofim == 0 && Oini == 0) {
                                        selectedRecords[0].set("juspre", '');
                                    }
                                    //}

                                } else { //cálculo para transporte coletivo.

                                    var Total = parseInt(Oini) * parseFloat(vOdofim);
                                    selectedRecords[0].set("vlrdes", parseFloat(Total));
                                }
                            },
                            specialkey: function(field, e) {

                                    //var models  = JGrid.getStore().getRange();
                                    var Jgrid = Ext.getCmp('gridprNovGestCR');
                                    var sStore = Jgrid.getStore();
                                    var selectedRecords = Jgrid.getSelectionModel().getSelection();
                                    var rowSelected = Jgrid.view.getSelectionModel().getCurrentPosition().row;
                                    var vTransp = selectedRecords[0].get('destrp');
                                    var vVlr = selectedRecords[0].get('vlrdes');
                                    var vOdofim = Ext.getCmp('hodfimNovCR').getValue();
                                    var vOdofimC = Ext.getCmp('hodfimNovCR');

                                    var models = Jgrid.getStore().getRange();

                                    var Oini = models[rowSelected].get("odoini");
                                    var Ofim = models[rowSelected].get("odofim");

                                    if (e.getKey() == 27) {
                                        //return false;
                                        Ext.getCmp('cadpresgestcr').close();
                                    }

                                    switch (e.getKey()) {

                                        case e.TAB:

                                           if (vTransp == "Coletivo") {

                                                if (vVlr < 0) { //(Ofim < Oini) || (vVlr<0)

                                                    selectedRecords[0].set("quilometro", 0);
                                                    selectedRecords[0].set("vlrdes", 0);
                                                    selectedRecords[0].set("odoini", 0);
                                                    selectedRecords[0].set("odofim", 0);

                                                    g_vOdfim = 0;
                                                    g_vOdini = 0;
                                                    g_TrpAnt = 0;

                                                    Ext.Msg.alert('Mensagem', 'Não é permitido cadastrar valor negativo.');
                                                } else {}
                                            }

                                            break;
                                        case e.ENTER:

                                            if (vTransp == "Proprio") { //cálculo para transporte Proprio.

                                                if (vVlr < 0) { //(Ofim < Oini) || (vVlr<0)

                                                    //Ext.getCmp('hodfim').setValue(0);
                                                    Ext.Msg.alert('Mensagem', 'O hodometro final é menor que o inicial.');

                                                    models[rowSelected].set("quilometro", 0);
                                                    models[rowSelected].set("vlrdes", 0);
                                                    models[rowSelected].set("odoini", 0);
                                                    vOdofimC.setValue(0);

                                                    g_vOdfim = 0;
                                                    g_vOdini = 0;
                                                    g_TrpAnt = 0;
                                                }
                                            }                                            

                                            break;

                                    } //Fim do switch

                                } //Fim do specialkey
                                ,
                            blur: function() {
                                    var Jgrid = Ext.getCmp('gridprNovGestCR');
                                    var sStore = Jgrid.getStore();
                                    var selectedRecords = Jgrid.getSelectionModel().getSelection();
                                    var rowSelected = Jgrid.view.getSelectionModel().getCurrentPosition().row;
                                    var vTransp = selectedRecords[0].get('destrp');
                                    var vVlr = selectedRecords[0].get('vlrdes');
                                    var vOdofim = Ext.getCmp('hodfimNovCR').getValue();
                                    var vOdofimC = Ext.getCmp('hodfimNovCR');

                                    var models = Jgrid.getStore().getRange();

                                    var Oini = selectedRecords[0].get("odoini");
                                    var Ofim = selectedRecords[0].get("odofim");

                                    if (g_TrpAnt == "Proprio") {

                                        if ((g_vOdfim < g_vOdini) || (g_vOdfim == 0 && g_vOdini != 0)) {


                                            models[g_RowAnt].set("quilometro", 0);
                                            models[g_RowAnt].set("vlrdes", 0);
                                            models[g_RowAnt].set("odoini", 0);
                                            models[g_RowAnt].set("odofim", 0);
                                            models[g_RowAnt].set("juspre", '');

                                            g_RowAnt = 0;
                                            g_vOdini = 0;
                                            g_TrpAnt = 0;

                                            Ext.Msg.alert('Mensagem', 'O hodometro final é menor que o inicial.');
                                        }
                                    } else
                                    if (g_TrpAnt == "Coletivo") {
                                        
                                    }

                                } //Fim do blur
                                ,
                            delay: 1 //atrasa a visualização da menssagem.
                        }
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Total Km',
                    width: 100,
                    align: 'center',
                    id: 'quilometroNovCR',
                    dataIndex: 'quilometro',
                    style: {

                        borderColor: '#F5F5F5',
                        textAlign: 'center'
                    },
                    hoverCls: 'black',
                    summaryType: 'sum',
                    renderer: function(val) {
                            var metod = Ext.util.Format.maskRenderer('', true);

                            if (val.length > 1) {

                                metod = Ext.util.Format.maskRenderer('', true);
                            }

                            return metod(val);
                        }
                        //menuDisabled:true
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Valor total',
                    align: 'center',
                    name: 'vlrdesNovCR',
                    menuDisabled: true,
                    id: 'vlrdesNovCR',
                    dataIndex: 'vlrdes',
                    style: {

                        borderColor: '#F5F5F5',
                        textAlign: 'center'
                    },
                    hoverCls: 'black',
                    width: 100,
                    summaryType: 'sum',
                    summaryRenderer: function(value) {

                        //return Ext.String.format('Total R$ {0}', parseFloat(value));
                        var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        //metodo = Ext.util.CSS.createStyleSheet('color:red','value');
                        if (value.length > 1) {

                            metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        }

                        return metodo(value);

                    },
                    renderer: function(valor) {
                        var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);

                        if (valor.length > 1) {

                            metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                        }

                        return metodo(valor);
                    }

                },
                {
                    header: 'Trajeto percorrido',
                    dataIndex: 'juspre',
                    id: 'juspreNovCR',
                    flex: 1,
                    menuDisabled: true,
                    style: {
                        borderColor: '#F5F5F5',
                        textAlign: 'center'
                    },
                    hoverCls: 'black',
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        id: 'descNovCR',
                        allowBlank: false, //true
                        enableKeyEvents: true,
                        listeners: {

                            specialkey: function(field, e) {

                                    var Jgrid = Ext.getCmp('gridprNovGestCR');
                                    var sStore = Jgrid.getStore();
                                    var selectedRecords = Jgrid.getSelectionModel().getSelection();
                                    var rowSelected = Jgrid.view.getSelectionModel().getCurrentPosition().row;
                                    var vTransp = selectedRecords[0].get('destrp');
                                    var vVlr = selectedRecords[0].get('vlrdes');
                                    var DescC = Ext.getCmp('descNovCR');
                                    var DescE = Ext.getCmp('descNovCR').getValue();
                                    //var vOdofim   = Ext.getCmp('hodfimNov').getValue();
                                    var vOdofimC = Ext.getCmp('hodfimNovCR');

                                    var models = Jgrid.getStore().getRange();

                                    var Oini = models[rowSelected].get("odoini");
                                    var Ofim = models[rowSelected].get("odofim");

                                    if (e.getKey() == 27) {
                                        //return false;
                                        Ext.getCmp('cadpresgestcr').close();
                                    }

                                    switch (e.getKey()) {                                       

                                        case e.ENTER:
                                            //e.keyCode = e.TAB;
                                            if (vTransp == "Coletivo") {

                                                //alert(Ofim);
                                                //alert(Oini);

                                                if (
                                                    (Ofim != 0 && Oini == 0) || (Ofim == 0 && Oini != 0) || (Ofim == 0 && Oini == 0) ||
                                                    (Ofim != 0 && Oini != 0 && DescE == "") || (Ofim != 0 && Oini != 0 && DescE == " ")

                                                ) {

                                                    models[rowSelected].set("quilometro", 0);
                                                    models[rowSelected].set("vlrdes", 0);
                                                    models[rowSelected].set("odoini", 0);
                                                    models[rowSelected].set("odofim", 0);
                                                    models[rowSelected].set("juspre", '');
                                                    DescC.setValue('');
                                                }

                                                //var Total = parseInt(Oini) * parseFloat(Ofim);
                                                //selectedRecords[0].set("vlrdes", parseFloat(Total));
                                            } else
                                            if (vTransp == "Proprio") {

                                                if (
                                                    (Ofim != 0 && Oini == 0) || (Ofim == 0 && Oini != 0) || (Ofim == 0 && Oini == 0) ||
                                                    (Ofim != 0 && Oini != 0 && DescE == "") || (Ofim != 0 && Oini != 0 && DescE == " ")
                                                ) {

                                                    models[rowSelected].set("quilometro", 0);
                                                    models[rowSelected].set("vlrdes", 0);
                                                    models[rowSelected].set("odoini", 0);
                                                    models[rowSelected].set("odofim", 0);
                                                    models[rowSelected].set("juspre", '');
                                                    DescC.setValue('');
                                                }
                                            }

                                            break;
                                    }

                                } //fim do special
                                ,
                            focus: function() {

                                var grid = Ext.getCmp('gridprNovGestCR');
                                var selectedRecords = grid.getSelectionModel().getSelection();
                                var rowSelected = grid.view.getSelectionModel().getCurrentPosition().row;
                                var models = grid.getStore().getRange();
                                var rowS = rowSelected - 1;

                                var numevt = models[rowSelected].get("numevt");

                                if (numevt == 2) {

                                    //Ext.getCmp('descNov').setDisabled(true);
                                    Ext.Msg.alert('Mensagem', 'Datas adicionais não podem ser editadas.');

                                }

                            }, //Fim do focus
                            keyup: function() {

                                var grid = Ext.getCmp('gridprNovGestCR');
                                var selectedRecords = grid.getSelectionModel().getSelection();
                                var rowSelected = grid.view.getSelectionModel().getCurrentPosition().row;
                                var models = grid.getStore().getRange();

                                var DescC = Ext.getCmp('descNovCR');
                                var DescE = Ext.getCmp('descNovCR').getValue();
                                var Desc = selectedRecords[0].get('juspre');
                                var Oini = selectedRecords[0].get('odoini');
                                var Ofim = selectedRecords[0].get('odofim');
                                var vTrans = selectedRecords[0].get('destrp');
                                var idtrp = selectedRecords[0].get('tiptrp');

                                //alert(galtTrp);

                                //Tratamento da Mensagem

                                if (idtrp == 1) {

                                    if (galtTrp == 0) {
                                        var mens = 'Preencha primeiro a quilometragem inicial e final do dia.';
                                    } else {
                                        var mens = 'Preencha primeiro a quantidade e o valor da passagem do dia.';
                                    }
                                } else
                                if (idtrp == 2) {

                                    if (galtTrp == 0) {
                                        var mens = 'Preencha primeiro a quantidade e o valor da passagem do dia.';
                                    } else {
                                        var mens = 'Preencha primeiro a quilometragem inicial e final do dia.';
                                    }
                                }

                                //Tratamento para orientação do prenchimento

                                if (
                                    (
                                        (Oini == 0 && Ofim == 0) ||
                                        (Oini > 0 && Ofim == 0) ||
                                        (Oini == 0 && Ofim > 0)) && (DescE != "" && DescE != " ")
                                ) {

                                    DescC.setValue("");
                                    selectedRecords[0].set("odoini", 0);
                                    selectedRecords[0].set("odofim", 0);
                                    selectedRecords[0].set("quilometro", 0);
                                    selectedRecords[0].set("vlrdes", 0);
                                    galtTrp = 0;

                                    function showResult(btn) {

                                        if (btn == 'ok') {

                                            models[rowSelected].set("juspre", '');
                                        }
                                    }

                                    Ext.Msg.show({
                                        title: 'Mensagem',
                                        msg: mens,
                                        buttons: Ext.Msg.OK,
                                        closable: false,
                                        fn: showResult
                                    });

                                }

                                g_RowAnt = rowSelected;
                                g_Desc = Desc;
                                g_DescE = DescE;
                                g_DescCmp = DescC;
                                g_vOdfim = Ofim;
                                g_vOdini = Oini;
                                g_TrpAnt = vTrans;

                            }
                        }
                    }
                } //Fim da coluna descrição

            ], //fim das colunas grid
            plugins: [cellEditing],
            listeners: {
                beforeedit: function(editor, grid, opts) {

                    Ext.getCmp('btn_encplanCR').setDisabled(true);
                    Ext.getCmp('btnnovCR').setDisabled(true);
                },

                select: function() {

                    var Jgrid = Ext.getCmp('gridprNovGestCR');
                    var models = Jgrid.getStore().getRange();
                    var rowSelected = Jgrid.view.getSelectionModel().getCurrentPosition().row;
                    var selectedRecords = Jgrid.getSelectionModel().getSelection();
                    var numevt = selectedRecords[0].get("numevt");
                   
                    if (g_vOdfim == null) {

                        g_vOdfim = g_vOdfimEd;
                        models[g_RowAnt].set("vlrdes", g_VlrAnt);
                    }

                    if (g_TrpAnt == "Proprio") {

                        if ((g_vOdfim > 0 && g_vOdini == 0) || 
                            (g_vOdfim == 0 && g_vOdini > 0) || (g_vOdfim < g_vOdini) ||
                            (g_vOdfim == 0 && g_vOdini == 0 && g_DescE != "") ||
                            (g_vOdfim != 0 && g_vOdini != 0 && g_DescE == " ") ||
                            (g_vOdfim != 0 && g_vOdini != 0 && g_DescE == "")
                        ) {

                            //alert('passou');
                            models[g_RowAnt].set("quilometro", 0);
                            models[g_RowAnt].set("vlrdes", 0);
                            models[g_RowAnt].set("odoini", 0);
                            models[g_RowAnt].set("odofim", 0);
                            models[g_RowAnt].set("juspre", '');

                            if (g_DescE != 0) {

                                g_DescCmp.setValue('');
                            }

                            if (g_vOdini == 0) {
                                g_VEdFim.setValue(0);
                                g_vOdini = 0
                            }

                            if (g_vOdfim == 0) {

                                g_VEdIni.setValue(0);
                            }

                            if (g_vOdfim != 0 && g_vOdini != 0) {

                                g_VEdFim.setValue(0);
                                g_VEdIni.setValue(0);
                            }

                            g_vOdfim = 0;
                            g_vOdini = 0;
                            g_DescE = '';
                        }
                    } else
                    if (g_TrpAnt == "Coletivo") {

                        if ((g_vOdfim > 0 && g_vOdini == 0) ||
                            (g_vOdfim == 0 && g_vOdini > 0) || (g_vOdfim == 0 && g_vOdini == 0 && g_DescE != "") ||
                            (g_vOdfim != 0 && g_vOdini != 0 && g_DescE == " ") || (g_vOdfim == 0 && g_vOdini > 0) ||
                            (g_vOdfim != 0 && g_vOdini != 0 && g_DescE == "")

                        ) {

                            models[g_RowAnt].set("quilometro", 0);
                            models[g_RowAnt].set("vlrdes", 0);
                            models[g_RowAnt].set("odoini", 0);
                            models[g_RowAnt].set("odofim", 0);
                            models[g_RowAnt].set("juspre", '');

                            if (g_DescE != 0) {

                                g_DescCmp.setValue('');
                            }

                            if (g_vOdini == 0 ) {

                                g_VEdFim.setValue(0);
                                g_vOdini = 0
                                    
                            }

                            if (g_vOdfim == 0) {

                                g_VEdIni.setValue(0);                                
                            }

                            if (g_vOdfim != 0 && g_vOdini != 0) {

                                g_VEdFim.setValue(0);
                            }

                            g_vOdfim = 0;
                            g_vOdini = 0;
                            g_DescE = '';
                        }

                    }

                    if (numevt == 1) {

                    }
                },
                cellclick: function() {

                    var lGrid = Ext.getCmp('gridprNovGestCR');
                    var selectedRecords1 = lGrid.getSelectionModel().getSelection();
                    var numevt = selectedRecords1[0].get("numevt"); //edição

                    if (numevt == 2) {

                        return false;
                    }

                    if (numevt == 3) {

                        return false;
                    }
                }
            }
        }

    ],
    //
    /*dockedItems: [
         {
           xtype: 'toolbar',
           dock: 'bottom',
           items: [

           ]
        }
     ],*/
    listeners: {
        //Acrecentar funções da Janela
        beforerender: function() {

            var sPanelGridN = Ext.getCmp('gridpreGestCR');
            var selectedRecord = sPanelGridN.getSelectionModel().getSelection();

            vValtrp = selectedRecord[0].get("vlrtrp"); 
            vSeqpla = selectedRecord[0].get("numseq"); 
            vTiptrp = selectedRecord[0].get("tiptrp"); 
            vStspr = selectedRecord[0].get("stspre"); 
            vNomfun = selectedRecord[0].get("nomfun"); 
            vNumcad = selectedRecord[0].get("numcad"); 
            vDatpla = selectedRecord[0].get("mesref"); 
            vDestrp = selectedRecord[0].get("destrp"); 
            vjuspre = selectedRecord[0].get("juspre"); 
            vNomloc = selectedRecord[0].get("nomloc"); 
            vDtfim = selectedRecord[0].get("dtfim");

            dateParm = Ext.Date.parse(vDtfim, "d/m/Y");
            dateH = mes + '/' + dia + '/' + ano;
            dateHoje = new Date(dateH);

            //variaveis globais para manipulação da grid
            g_vOdiniEd = 0;
            g_vOdini = 0;
            g_vOdfim = 0;
            g_vOdfimEd = 0;
            g_RowAnt = 99;
            g_VlrAnt = 0;
            g_TrpAnt = 0;
            g_VEdIni = 0;
            g_VEdFim = 0;
            g_vlrTot = 0;
            g_Desc = '';
            g_DescE = '';
            g_DescCmp = 0;
            galtTrp = 0;

            var btn = Ext.getCmp('btn_arqprest');
            var comboUso = Ext.getCmp('usuCombo');
            comboSts = Ext.getCmp('statusCombo');
            situacao = comboSts.getValue();

            //Tratamento para setar valores no cabeçalho
            Ext.getCmp('resMatricula').setText(vNumcad);
            Ext.getCmp('resNome').setText(vNomfun);
            Ext.getCmp('resLocal').setText(vNomloc);
            Ext.getCmp('resPeriodo').setText(vDatpla);
           
            /*if (vStspr != 4) {

                btn.hide();
                Ext.getCmp('btn_encplanCR').hide();
                Ext.getCmp('btn_saveCR').hide();
                Ext.getCmp('btnnovCR').hide();
                Ext.getCmp('btn_justCR').hide();
                Ext.getCmp('btn_validCR').hide();
            } else
            if (niv == 1 || niv == 2 || niv == 3 || niv == 4) {

                if (vStspr == 0) { //aberto

                    btn.hide();
                    Ext.getCmp('btn_encplanCR').setDisabled(false);
                    Ext.getCmp('btn_saveCR').show();
                    Ext.getCmp('btnnovCR').show();
                    Ext.getCmp('btn_justCR').hide();
                    Ext.getCmp('btn_validCR').hide();

                } else
                if (vStspr > 0) {

                    btn.hide();
                    Ext.getCmp('btn_encplanCR').hide();
                    Ext.getCmp('btn_saveCR').hide();
                    Ext.getCmp('btnnovCR').hide();
                    Ext.getCmp('btn_justCR').hide();
                    Ext.getCmp('btn_validCR').hide();

                }

            }*/

            tGrid = Ext.getCmp('gridprNovGestCR');
            strPresGestCR = tGrid.getStore();

           strPresGestCR.load({
                params: { numseq: vSeqpla, tiptrp: vTiptrp, numcad: vNumcad }
            });
        },

        beforeclose: function() {
            //Tratamento ao fechar janela de cadastro de planejamento,
            //o reload da grid de abertura deve obedecer o valor da
            //situação.
            var xGrid = Ext.getCmp('gridpreGestCR');
            var selectedRecords = xGrid.getSelectionModel().getSelection();
            var xStore = xGrid.getStore();
            var situacao = Ext.getCmp('statusCombo').getValue();
            var usu = Ext.getCmp('usuCombo').getValue();
            var comboUso = Ext.getCmp('usuCombo');
            var comboUnid = Ext.getCmp('uniCombo');
            var comboReg = Ext.getCmp('regCombo');
            var comboSts = Ext.getCmp('statusCombo');
            var comboStatus = comboSts.getValue();
            var comboMes = Ext.getCmp('mesCombo').getValue();
            var comboAno = Ext.getCmp('anoCombo').getValue();

            xStore.load({
                params: {
                    mat: usu,
                    btn: 0
                }
            });

            Ext.getCmp('cadpresgestcr').destroy();

        }
    }
    /*bbar: [



    ]*/ // Fim da barra inferior

});


//================================================================================
//================================================================================
//Telas extras para prestação

Ext.onReady(function() {
    Ext.QuickTips.init();

    var form = new Ext.FormPanel({
        labelWidth: 80,
        frame: true,
        title: 'Alterar para outro transporte',
        defaultType: 'textfield',
        monitorValid: true,
        items: [

            {
                xtype: 'combo',
                fieldLabel: 'Transporte',
                editable: false,
                name: 'trans',
                id: 'trans',
                emptyText: 'Selecione um Tipo',
                store: Ext.create('desloc.store.TipoTransS'),
                displayField: 'destrp',
                valueField: 'tiptrp',
                triggerAction: 'all',
                mode: 'local',
                listeners: {
                    select: function() {
                        var valcombo = Ext.getCmp('trans').getValue();
                        var qtdpsg = Ext.getCmp('qtdpsg');
                        var valpsg = Ext.getCmp('valpsg');
                        var hdini = Ext.getCmp('hdini');
                        var hdfim = Ext.getCmp('hdfim');
                        var vlrtot = Ext.getCmp('vlrtot');
                        var vlrad = Ext.getCmp('vlrad');
                        var tiptra = Ext.getCmp('tiptra');
                        //console.log(valcombo);

                        if (valcombo == 1) {

                            hdini.show();
                            hdfim.show();
                            //vlrtot.show();
                            qtdpsg.hide();
                            valpsg.hide();
                            vlrad.hide();

                        } else {

                            qtdpsg.show();
                            valpsg.show();
                            vlrad.hide();
                            //vlrtot.show();
                            hdini.hide();
                            hdfim.hide();

                        }
                    }
                }
            }, {
                xtype: 'datefield',
                fieldLabel: 'Data de Deslocamento',
                name: 'dtdes',
                id: 'dtdes',
                format: 'd/m/Y',
                allowBlank: false
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Qtd Passagem',
                name: 'qtdpsg',
                id: 'qtdpsg',
                minValue: 0,
                maxValue: 50,
                allowBlank: false

            }, {
                xtype: 'numberfield',
                fieldLabel: 'Valor da Passagem',
                name: 'valpsg',
                id: 'valpsg',
                minValue: 0,
                maxValue: 1000,
                allowBlank: false
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Hodometro Inicial',
                name: 'hdini',
                id: 'hdini',
                minValue: 0,
                maxValue: 10000,
                allowBlank: false
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Hodometro Final',
                name: 'hdfim',
                id: 'hdfim',
                minValue: 0,
                maxValue: 10000,
                allowBlank: false

            }, {
                xtype: 'numberfield',
                fieldLabel: 'Valor',
                name: 'vlrad',
                id: 'vlrad',
                allowBlank: false
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Trajeto',
                name: 'trajeto',
                id: 'trajeto'
            }

        ],
        buttons: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function() {
                    var grid = Ext.getCmp('gridprNovGestCR');

                    var sStore = grid.getStore();
                    //var valcombo = Ext.getCmp('vlradd').getValue();
                    var qtdpsg = Ext.getCmp('qtdpsg').getValue();
                    var valpsg = Ext.getCmp('valpsg').getValue();
                    var hdini = Ext.getCmp('hdini').getValue();
                    var hdfim = Ext.getCmp('hdfim').getValue();
                    //var vlrtot   = Ext.getCmp('vlrtot').getValue();
                    var vlrad = Ext.getCmp('vlrad').getValue();
                    var transp = Ext.getCmp('trans').getValue();
                    var dtdes = Ext.getCmp('dtdes').getValue();
                    var trajeto = Ext.getCmp('trajeto').getValue();

                    Ext.Ajax.request({
                        url: '/php/Prestacao/outrosValores.php',
                        method: 'post',
                        params: {

                            vlradd: valcombo,
                            tiptra: transp, //tiptra:vTiptrp,
                            numseq: vSeqpla,
                            dtdes: dtdes,
                            hdini: hdini,
                            hdfim: hdfim,
                            id: Tnumseq,
                            trajeto: trajeto,
                            valpsg: valpsg,
                            qtdpsg: qtdpsg,
                            vlrad: vlrad,
                            btn: Btn

                        },
                        success: function(conn, response, options, eOpts) {

                            var result = Ext.JSON.decode(conn.responseText, true);

                            if (!result) { // caso seja null
                                result = {};
                                result.success = true;
                            }

                            if (result.success) {

                                Ext.Msg.alert('Mensagem', 'Registro cadastrado com Sucesso!', function(btn, text) {

                                    if (btn == "ok") {

                                        sStore.load({
                                            params: { numseq: vSeqpla, tiptrp: vTiptrp, numcad: vNumcad }
                                        });
                                        var teste = Ext.getCmp('novoValor');
                                        form.getForm().reset();
                                        teste.hide();
                                    }
                                });

                            } else {

                                Ext.Msg.alert('Mensagem', 'Não foi possível cadastrar o registro!');
                                sStore.load();
                            }

                        }

                    });
                }

            },
            {

                text: 'Fechar',
                iconCls: 'icon-fechar',
                handler: function() {
                    var teste = Ext.getCmp('novoValor');
                    teste.hide();

                }
            }


        ]

    });

    var winVlr = new Ext.Window({
        id: 'novoValor',
        layout: 'fit',
        autoScroll: true,
        modal: true,
        width: 300,
        height: 300,
        closable: true,
        resizable: true,
        plain: true,
        border: false,
        items: [form]

    });
    winVlr.hide();
});