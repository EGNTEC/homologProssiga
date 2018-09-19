var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1,
    errorSummary: false
});

Ext.define('desloc.view.cargosGestao.CadPresGestCRNoEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.cadpresgestcrnoedit',
    title: 'Cadastrar Prestação de Contas',
    iconCls: 'icon-grid',
    width: 990,
    height: 550,
    id: 'cadpresgestcrnoedit',
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
            id: 'gridprNovGestCRNoEdit',
            height: 400,
            //selModel: sm,
            /*selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI'
            },*/
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
                    xtype: 'button',
                    text: 'Arquivo de Prestação',
                    id: 'btn_arqprestCR',
                    name: 'btn_arqprest',
                    //hrefTarget : "_blank",
                    href: 'https://novoprossiga.inec.org.br/teste2/php/Prestacao/ArqPrest.php',
                    iconCls: 'icon-prest',
                    handler: function() {
                        var sPanelGrid = Ext.getCmp('gridpreGestCR');
                        var sStore = sPanelGrid.getStore();
                        var selectedRecords = sPanelGrid.getSelectionModel().getSelection();
                        var btn = Ext.getCmp('btn_arqprestCR');

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
                }

            ], //fim da barra inferior da grid
            columns: [

                {
                    header: 'Id',
                    id: 'numseqNovCRNoEdit',
                    name: 'numseqNovCRNoEdit',
                    dataIndex: 'numseq',
                    hidden: true,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Id Abertura',
                    id: 'seqpreNovCRNoEdit',
                    name: 'seqpreNovCRNoEdit',
                    dataIndex: 'seqpre',
                    hidden: true,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    id: 'numevtNovCRNoEdit',
                    name: 'numevtNovCRNoEdit',
                    dataIndex: 'numevt',
                    hidden: true
                },
                {
                    xtype: 'datecolumn',
                    header: 'Data',
                    id: 'datpreNovCRNoEdit',
                    align: 'center',
                    menuDisabled: true,
                    name: 'datpreNovCRNoEdit',
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
                    id: 'destrpNovCRNoEdit',
                    style: {

                        borderColor: '#F5F5F5',
                        textAlign: 'center'
                    },
                    hoverCls: 'black'
                },
                {
                    width: 120,
                    dataIndex: 'Coluna1',
                    align: 'right',
                    id: 'EstHodIniQtdNovCRNoEdit',
                    menuDisabled: true,
                    style: {

                        borderColor: '#F5F5F5'
                    },
                    hoverCls: 'black'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'center',
                    dataIndex: 'odoini',
                    width: 69,
                    id: 'odoiniNovCRNoEdit',
                    name: 'odoiniNovCRNoEdit',
                    menuDisabled: true,
                    style: {

                        borderColor: '#F5F5F5'
                    },
                    hoverCls: 'black',
                    renderer: function(val) {
                        var met = Ext.util.Format.maskRenderer('', true);

                        if (val.length > 1) {

                            met = Ext.util.Format.maskRenderer('', true);
                        }

                        return met(val);
                    }
                },
                {
                    width: 120,
                    dataIndex: 'Coluna2',
                    align: 'right',
                    id: 'EstHodFimVlrNovCRNoEdit',
                    menuDisabled: true,
                    style: {

                        borderColor: '#F5F5F5'
                    },
                    hoverCls: 'black'

                },
                {
                    width: 69,
                    align: 'center',
                    dataIndex: 'odofim',
                    id: 'odofimNovCRNoEdit',
                    name: 'odofimNovCRNoEdit',
                    menuDisabled: true,
                    style: {

                        borderColor: '#F5F5F5'
                    },
                    hoverCls: 'black'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Total Km',
                    width: 100,
                    align: 'center',
                    id: 'quilometroNovCRNoEdit',
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
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Valor total',
                    align: 'center',
                    name: 'vlrdesNovCRNoEdit',
                    menuDisabled: true,
                    id: 'vlrdesNovCRNoEdit',
                    dataIndex: 'vlrdes',
                    style: {

                        borderColor: '#F5F5F5',
                        textAlign: 'center'
                    },
                    hoverCls: 'black',
                    width: 100,
                    summaryType: 'sum',
                    summaryRenderer: function(value) {

                        var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
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
                    id: 'juspreNovCRNoEdit',
                    flex: 1,
                    menuDisabled: true,
                    style: {
                        borderColor: '#F5F5F5',
                        textAlign: 'center'
                    },
                    hoverCls: 'black'

                } //Fim da coluna descrição

            ], //fim das colunas grid
            plugins: [cellEditing],
            listeners: {
                
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

            var btn = Ext.getCmp('btn_arqprestCR');
            var comboUso = Ext.getCmp('usuCombo');
            comboSts = Ext.getCmp('statusCombo');
            situacao = comboSts.getValue();

            //Tratamento para setar valores no cabeçalho
            Ext.getCmp('resMatricula').setText(vNumcad);
            Ext.getCmp('resNome').setText(vNomfun);
            Ext.getCmp('resLocal').setText(vNomloc);
            Ext.getCmp('resPeriodo').setText(vDatpla);
           
            tGrid = Ext.getCmp('gridprNovGestCRNoEdit');
            strPresGestCR = tGrid.getStore();

           strPresGestCR.load({
                params: { numseq: vSeqpla, tiptrp: vTiptrp, numcad: vNumcad }
            });

            //Tratamento para impressão do arquivo de importação
            if (vStspr >= 2) {
                btn.setDisabled(false);
            } else {
                btn.setDisabled(true);
            }
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

            Ext.getCmp('cadpresgestcrnoedit').destroy();

        }
    }

});

