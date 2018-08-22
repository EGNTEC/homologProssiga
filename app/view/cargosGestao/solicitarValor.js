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
                    },
                    {
                        xtype: 'combo',
                        editable: false,
                        id: 'gambCombo',
                        tabIndex: -1,
                        hidden: false
                    }   
                ]              
          }]      
      }, //Fim do Formulário    
      {
          xtype: 'grid',
          id: 'gridCadCoord',
          heigth: 600,
          selModel: {

          },
          layout: 'fit',
          //store:,
          features: [{
               ftype: 'summary' 
          }],
          columns: [
              {
                 xtype: 'actionbuttoncolumn',
                 menuDisabled: true,
                 width: 36,
                 items: [{
                     iconCls: 'icon-edit'
                 }]   

              },
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
            }
        ]

      } //Fim da primeira grid
      
    ]
});