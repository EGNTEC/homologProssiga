Ext.define('desloc.view.cargosGestao.solicitarValor',{
    extend: 'Ext.window.Window',
    alias: 'widget.platform',
    title: 'Solicitar Valor Para Deslocamento',
    heigth: 550,
    width: 990,
    autoScroll: true,
    id: 'solvlr',
    align: 'stretch' ,
    modal: true,
    maximizable: 'true',
    resizable: 'true',
    autoShow: true,
    
    requires: [
        'Ext.selection.CheckboxModel',
        'Ext.selection.CellModel',
        'Ext.util.ComponentDragger',
        'Ext.util.Region',
        'Ext.ux.TextMaskPlugin',
        'Ext.ux.grid.column.ActionButtonColumn',
        'Ext.EventManager',
        'Ext.tab.*',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.state.*',
        'Ext.form.*'
    ],

    items: [{xtype: 'container',
             layout: 'fit',
             heigth: 145,
             width: 1350,
             items:[
                {xtype: 'form',
                 id: 'formSolVlr',
                 layout: 'vbox',
                 defaults: {
                    padding: 2,
                    anchor: '100%',
                    margins: '3 0 0 0',
                    width: 750
                 },
                 items:[ //adicionar as combos    
                    {
                        xtype: 'combo',
                        editable: false,
                        id: 'regCombo',
                        fieldLabel: 'Regional',
                        displayField: 'regional',
                        valueField: 'numloc',
                        store: Ext.create('desloc.store.Regs'),
                        triggerAction: 'all',
                        totalProperty: 'total',
                        mode: 'local',
                        listeners: {
                            select: {
                                fn: function(combo, value) {

                                    var comboUnid = Ext.getCmp('uniCombo');
                                    comboUnid.setDisabled(true);
                                    comboUnid.setValue('');
                                    comboUnid.store.removeAll();

                                    comboUnid.store.load({
                                        params: { regId: combo.getValue() }
                                    });
                                    comboUnid.setDisabled(false);
                                }
                            }
                        }
                    },
                    {
                        xtype: 'combo',
                        editable: false,
                        id: 'uniCombo',
                        fieldLabel: 'Unidade',
                        emptyText: 'Selecione a Unidade',
                        displayField: 'nomloc',
                        valueField: 'numloc',
                        store: Ext.create('desloc.store.Unids'),
                        triggerAction: 'all',
                        mode: 'local',
                        disabled: true,
                        listeners: {
                            select: {
                                fn: function(combo, value) {

                                    var comboUso = Ext.getCmp('usuCombo');
                                    comboUso.setDisabled(true);
                                    comboUso.setValue('');
                                    comboUso.store.removeAll();

                                    comboUso.store.load({
                                        params: { uniId: combo.getValue() }
                                    });
                                    comboUso.setDisabled(false);
                                }
                            }
                        }

                    },
                    {
                        xtype: 'combo',
                        id: 'usuCombo',
                        fieldLabel: 'Colaborador',
                        emptyText: 'Selecione um Colaborador',
                        store: Ext.create('desloc.store.Usos'),
                        displayField: 'nomfun',
                        valueField: 'numcad',
                        triggerAction: 'all',
                        editable: false,
                        mode: 'local',
                        disabled: true,
                        lastQuery: '',
                        listeners: {

                            change: function() {

                            }
                        }
                    },
                    {
                        xtype: 'combo',
                        id: 'statusCombo',
                        fieldLabel: 'Situação',
                        emptyText: 'Selecione uma Situação',
                        store: Ext.create('desloc.store.SituacaoS'),
                        displayField: 'dessts',
                        valueField: 'numsts',
                        triggerAction: 'all',
                        editable: false,
                        mode: 'local',
                        //disabled:true,
                        lastQuery: ''
                    },
                    {
                        xtype: 'combo',
                        id: 'mesCombo',
                        //width:280,
                        fieldLabel: 'Referência',
                        emptyText: 'Mês',
                        store: Ext.create('desloc.store.MesS'),
                        displayField: 'name',
                        valueField: 'value',
                        triggerAction: 'all',
                        editable: false,
                        mode: 'local',
                        //disabled:true,
                        lastQuery: ''
                    },
                    {
                        xtype: 'combo',
                        id: 'anoCombo',
                        emptyText: 'Ano',
                        store: Ext.create('desloc.store.AnoS'),
                        displayField: 'name',
                        valueField: 'value',
                        triggerAction: 'all',
                        editable: false,
                        mode: 'local',
                        lastQuery: ''
                    }   
                ]              
          }]      
      }, //Fim do Formulário    
      {
          xtype: 'grid',
          id: 'gridCadCoord',
          heigth: 600,
          store: Ext.create('desloc.store.cargosGestao.listarSolicitarVlr'),
          /*selModel: {
            selType: 'checkboxmodel',
            mode: 'MULTI'
          },*/
          layout: 'fit',
          //store:,
          features: [{
               ftype: 'summary' 
          }],
          columns: [
              {
                header: 'Referência',
                dataIndex: 'datpla',
                width: 90,
                id: 'datplage',
                menuDisabled: true,
                name: 'datplage',
                summaryRenderer: function() {
                    return 'Total:'
                }                
            },
            {
                header: 'Matricula',
                dataIndex: 'numcad',
                width: 80,
                menuDisabled: true,
                hidden: false
            },
            {
                header: 'Nome',
                dataIndex: 'nomfun',
                //flex:1,
                width: 258,
                menuDisabled: true,
                summaryType: 'count'
            },
            {
                header: 'Cargo',
                width: 180,
                dataIndex: 'cargo',
                menuDisabled: true
            },
            {
                header: 'Transporte',
                dataIndex: 'destrp',
                width: 90,
                menuDisabled: true
            },
            {
                header: 'Valor Solicitado',
                dataIndex: 'vlrpla',
                width: 130,
                menuDisabled: true,
                summaryType: 'sum',
                renderer: function(val) {
                    var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);

                    if (val.length > 1) {

                        metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                    }

                    return metodo(val);
                }
            },
            {
                header: 'Situação',
                dataIndex: 'dessts',
                menuDisabled: true
            },
            {
                header: 'Local',
                width: 380,
                dataIndex: 'nomloc',
                menuDisabled: true,
                hidden: false
            }
        ],
        listeners: {

            itemClick: function(grid, record, item, index, e, eOpts) {
               var grid = Ext.getCmp('gridGerSolVlr');
               var selectedRecords = grid.getSelectionModel().getSelection();
               stspla = selectedRecords[0].get("stspla");

               if(stspla == 0){

                  Ext.create('desloc.view.cargosGestao.AbrPlanejamentoGestaoEdt');
               }   
             }
          }
      }, //Fim da primeira grid
      {
        xtype: 'grid',
        id: 'gridCadGer',
        heigth: 600,
        store: Ext.create('desloc.store.cargosGestao.listarSolicitarVlrGO'),
        selModel: {

        },
        layout: 'fit',
        //store:,
        features: [{
             ftype: 'summary' 
        }],
        columns: [
            {
              header: 'Referência',
              //dataIndex: 'datpla',
              width: 90,
              id: 'datpla',
              menuDisabled: true,
              name: 'datpla',
              summaryRenderer: function() {
                  return 'Total:'
              }
          },
          {
            header: 'Matricula',
            dataIndex: 'numcad',
            width: 80,
            menuDisabled: true,
            hidden: false
        },
        {
            header: 'Nome',
            dataIndex: 'nomfun',
            //flex:1,
            width: 258,
            menuDisabled: true,
            summaryType: 'count'
        },
        {
            header: 'Cargo',
            width: 180,
            dataIndex: 'cargo',
            menuDisabled: true
        },
        {
            header: 'Transporte',
            dataIndex: 'destrp',
            width: 90,
            menuDisabled: true
        },
        {
            header: 'Valor Solicitado',
            dataIndex: 'vlrpla',
            width: 130,
            menuDisabled: true,
            summaryType: 'sum',
            renderer: function(val) {
                var metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);

                if (val.length > 1) {

                    metodo = Ext.util.Format.maskRenderer('R$ #9.999.990,00', true);
                }

                return metodo(val);
            }
        },
        {
            header: 'Situação',
            dataIndex: 'dessts',
            menuDisabled: true
        },
        {
            header: 'Local',
            width: 380,
            dataIndex: 'nomloc',
            menuDisabled: true,
            hidden: false
        }
      ],
      listeners: {

        itemClick: function(grid, record, item, index, e, eOpts) {
           var grid = Ext.getCmp('gridGerSolVlr');
           var selectedRecords = grid.getSelectionModel().getSelection();
           stspla = selectedRecords[0].get("stspla");

         }
      }

     } // Fim da segunda grid
      
    ],

    //Dock para botões
    dockedItems: [{
        xtype: 'toolbar',
        dock:'bottom',
        items: [{
                xtype: 'button',
                id: 'btn_novo',
                text: 'Novo',
                iconCls: 'icon-novo',
                listeners: {

                    click: function(){
                        
                        Ext.getCmp('btn_novo').setDisabled(true);
                        var colComb = Ext.getCmp('usuCombo').getValue();

                        Ext.Ajax.request({
                            url: '/teste2/php/Planejamento/ValNov.php',
                            params: {
                                mat: colComb
                            },
                            success: function(response) {

                                var result = Ext.JSON.decode(response.responseText);
                                //console.log(result);
                                if (result == 1) {
                                    Ext.create('desloc.view.cargosGestao.AbrPlanejamentoGestao');
                                } else {
                                    Ext.Msg.alert('Mensagem', 'Não é possível cadastrar um planejamento para o período afastamento/férias.');
                                }
                            },
                            failure: function() {
                                //Ext.Msg.alert('Mensagem','Problema Na Base de Dados!');
                            }
                        });

                    }
                }
        },
        {
            xtype: 'button',
            text: 'Buscar',
            tooltip: 'Localizar Planejamentos',
            id: 'btn_buscge',
            iconCls: 'icon-buscar',
            handler: function() {
                var pGrid = Ext.getCmp('gridCadCoord');
                var gGrid = Ext.getCmp('gridCadGer');
                var comboUso = Ext.getCmp('usuCombo');
                var comboUnid = Ext.getCmp('uniCombo');
                var comboReg = Ext.getCmp('regCombo');
                var comboSts = Ext.getCmp('statusCombo');
                var comboStatus = comboSts.getValue();
                var comboMes = Ext.getCmp('mesCombo').getValue();
                var comboAno = Ext.getCmp('anoCombo').getValue();

                //Tratamento para o Coordenador Regional
                if(codcargo == 7800){

                     var aStore = pGrid.getStore();
                     aStore.load({
                        params: {
                            mat: comboUso.getValue(),
                            unid: comboUnid.getValue(),
                            reg: comboReg.getValue(),
                            sts: comboStatus,
                            mes: comboMes,
                            ano: comboAno
                        }
                      });
                }

                //Tratamento para Gerente de Operações
                if(codcargo == 6500){

                    var aStore = gGrid.getStore();
                     aStore.load({
                        params: {
                            mat: comboUso.getValue(),
                            unid: comboUnid.getValue(),
                            reg: comboReg.getValue(),
                            sts: comboStatus,
                            mes: comboMes,
                            ano: comboAno
                        }
                    });
                }                
            }
         }

        ]
    }]
});