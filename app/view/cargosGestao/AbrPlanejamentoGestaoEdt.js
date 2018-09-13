Ext.define('desloc.view.cargosGestao.AbrPlanejamentoGestaoEdt', {
    extend: 'Ext.window.Window',
    alias: 'widget.abrplanform',
    title: 'Editar Abertura de Planejamento',
    height: 150,
    width: 350,
    align: 'stretch',
    modal: true,
    resizable: 'true',
    align: 'center',
    autoShow: true,
    layout: 'fit',
    id: 'JanAbrPlanGestEdt',

    requires: [
        'Ext.util.ComponentDragger',
        'Ext.util.Region',
        'Ext.EventManager',
        'Ext.tab.Panel'
    ],
    listeners: {

        beforeclose: function() {
            
        }
    },
    items: [{
            xtype: 'form',
            id: 'FormAbrPlanGestEdt',
            layout: 'vbox',
            defaults: {
                padding: 2,
                anchor: '100%',
                margins: '3 0 0 0'
                    //width:490
            },
            items: [{
                    xtype: 'numberfield',
                    fieldLabel: 'Valor',
                    hideTrigger: true,
                    name: 'valsol',
                    id: 'valsol',
                    plugins: 'textmask',
                    mask: 'R$ 9.999.990,00',
                    money: true,
                    disabled: false,
                    allowBlank: false,
                    listeners: {
                        change: function(field, value) {
                            value = parseInt(value, 10);
                            //field.setValue(value);
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
                    var FormAbrPlan = Ext.getCmp('FormAbrPlanGestEdt');

                    Ext.MessageBox.show({
                        msg : 'Alterando dados da solicitação...',
                        progressText : 'Alterando...',
                        width : 300,
                        wait : true,
                        waitConfig : 
                        {
                            duration : 20000,
                            increment : 15,
                            text : 'Alterando...',
                            scope : this,
                            fn : function(){
                                //Ext.MessageBox.hide();
                                FormAbrPlan.getForm().submit({
                                    method: 'post',
                                    url: '/teste2/php/Planejamento/cargosGestao/UpdtSolVlr.php',
                                    params: {
                                        sitpla: stspla,
                                        seqpla: numseq
                                    },
                                    success: function() {
                                        
                                     if(codcargo == 7800){
            
                                        var pGrid = Ext.getCmp('gridCadCoord');
                                        var aStore = pGrid.getStore();
                                        aStore.load({
                                            params: {
                                                //mat: vMatcol.getValue(),
                                                //unid: comboUnid,
                                                //reg: comboReg
                                             }
                                        });
                                      }
            
                                      if(codcargo == 6500){
            
                                        var pGrid = Ext.getCmp('gridCadGer');
                                        var aStore = pGrid.getStore();
                                        aStore.load({
                                            params: {
                                                //mat: vMatcol.getValue(),
                                                //unid: comboUnid,
                                                //reg: comboReg
                                             }
                                        });
                                      }
                                     Ext.MessageBox.hide();
                                     Ext.Msg.alert('Mensagem', 'Alteração Realizada Com Sucesso.'); 
                                     Ext.getCmp('JanAbrPlanGestEdt').destroy();
            
                                    },
                                    failure: function() { Ext.Msg.alert('Mensagem', 'Não foi possível realizar a alteração.'); }
                                });
                            }
                        }
                    });
                }
            }
        ]
    }]
});