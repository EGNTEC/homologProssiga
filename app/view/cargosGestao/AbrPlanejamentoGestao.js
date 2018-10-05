Ext.define('desloc.view.cargosGestao.AbrPlanejamentoGestao', {
    extend: 'Ext.window.Window',
    alias: 'widget.abrplanform',
    title: 'Abertura de Planejamento',
    height: 200,
    width: 350,
    align: 'stretch',
    modal: true,
    resizable: 'true',
    align: 'center',
    autoShow: true,
    layout: 'fit',
    id: 'JanAbrPlanGest',

    requires: [
        'Ext.util.ComponentDragger',
        'Ext.util.Region',
        'Ext.EventManager',
        'Ext.tab.Panel'
    ],
    listeners: {

        beforeclose: function() {
            //Tratamento para habilitar botão novo planejamento
            Ext.Ajax.request({
                url: '/teste2/php/Planejamento/HabBtnNov.php',
                success: function(response) {

                    var result = Ext.JSON.decode(response.responseText);
                    
                    if (result == 1) {
                        
                    } else {

                        Ext.getCmp('btn_novo').setDisabled(false);
                        
                    }
                },
                failure: function() {
                    
                }
            });
        }
    },
    items: [{
            xtype: 'form',
            id: 'FormAbrPlan',
            layout: 'vbox',
            defaults: {
                padding: 2,
                anchor: '100%',
                margins: '3 0 0 0'
                    //width:490
            },
            items: [{
                    xtype: 'combo',
                    id: 'tiptrans',
                    editable: false,
                    name: 'tiptrans',
                    fieldLabel: 'Tipo de Transporte',
                    emptyText: 'Selecione um Transporte',
                    store: Ext.create('desloc.store.TipoTransS'),
                    displayField: 'destrp',
                    valueField: 'tiptrp',
                    triggerAction: 'all',
                    mode: 'local',
                    listeners: {
                        select: {
                            fn: function(combo, value) {

                                var comboUso = Ext.getCmp('usuCombo').getValue();
                                var comboRef = Ext.getCmp('refplandt');

                                comboRef.setDisabled(true);
                                comboRef.setValue('');
                                comboRef.store.removeAll();

                                comboRef.store.load({
                                    params: { mat: comboUso }
                                });
                                comboRef.setDisabled(false)
                            }
                        }
                    }
                },
                {
                    xtype: 'combo',
                    id: 'refplandt',
                    editable: false,
                    name: 'refplandt',
                    fieldLabel: 'Competência',
                    emptyText: 'Selecione uma Competência',
                    store: Ext.create('desloc.store.MesRefS'),
                    displayField: 'datpla', //datpla,name
                    valueField: 'datpla', //datpla,value
                    triggerAction: 'all',
                    disabled: true,
                    mode: 'local',
                    listeners: {
                        select:{
                            fn: function(combo, value){
                                Ext.getCmp('valsol').setDisabled(false);
                            }
                        }
                    }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Valor',
                    hideTrigger: true,
                    name: 'valsol',
                    id: 'valsol',
                    plugins: 'textmask',
                    mask: 'R$ 9.999.990,00',
                    money: true,
                    disabled: true,
                    allowBlank: false,
                    listeners: {
                        change: function(field, value) {
                            value = parseFloat(value, 10);
                            if (value < 0) {

                                field.setValue(value * (-1));
                            }
                            
                            if(value > vlrparm){

                                Ext.getCmp('btn_inserir').setDisabled(true)
                                Ext.Msg.alert('Mensagem','O Valor solicitado é maior que o valor limite de R$ '+vlrparm);

                            }else{

                                Ext.getCmp('btn_inserir').setDisabled(false)
                            }
                        }
                    }
                }
            ]
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [{
                xtype: 'button',
                id: 'btn_inserir',
                text: 'Ok',
                iconCls: 'icon-add',
                handler: function() {
                    var FormAbrPlan = Ext.getCmp('FormAbrPlan');
                    var vMatcol = Ext.getCmp('usuCombo');
                    var comboUnid = Ext.getCmp('uniCombo').getValue();
                    var comboReg = Ext.getCmp('regCombo').getValue();

                    Ext.MessageBox.show({
                        msg : 'Salvando dados de solicitação...',
                        progressText : 'Inserindo...',
                        width : 300,
                        wait : true,
                        waitConfig : 
                        {
                            duration : 20000,
                            increment : 15,
                            text : 'Inserindo...',
                            scope : this,
                            fn : function() {
                                //Ext.MessageBox.hide();
                                FormAbrPlan.getForm().submit({
                                    method: 'post',
                                    url: '/teste2/php/Planejamento/InsAbrPlan.php',
                                    params: {
                                        mat: vMatcol.getValue(),
                                        unid: comboUnid,
                                        reg: comboReg
                                    },
                                    success: function() {
                                        
                                     if(codcargo == 7800 || codcargo == 7300){
            
                                        var pGrid = Ext.getCmp('gridCadCoord');
                                        var aStore = pGrid.getStore();
                                        aStore.load({
                                            params: {
                                                mat: vMatcol.getValue(),
                                                unid: comboUnid,
                                                reg: comboReg
                                             }
                                        });
                                      }
            
                                      if(codcargo == 6500){
            
                                        var pGrid = Ext.getCmp('gridCadGer');
                                        var aStore = pGrid.getStore();
                                        aStore.load({
                                            params: {
                                                mat: vMatcol.getValue(),
                                                unid: comboUnid,
                                                reg: comboReg
                                             }
                                        });
                                      }            
                                     Ext.MessageBox.hide();
                                     Ext.Msg.alert('Mensagem', 'Solicitação Realizada Com Sucesso.'); 
                                     Ext.getCmp('JanAbrPlanGest').destroy();
            
                                    },
                                    failure: function() { Ext.Msg.alert('Mensagem', 'Não foi possível realizar a solicitação.'); }
                                });
                            }
                        }
                     });                    
                }
            }
        ]
    }]
});