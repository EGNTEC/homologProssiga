var StoreDev = Ext.create('Ext.data.Store', {
    extend: 'Ext.data.Store',
    autoLoad:true,
    fields: ['name', 'value'],
    data : [

        {name:'Devolução', value:3}        
    ]    
});

Ext.define('desloc.view.CadDevolucao', {
    extend: 'Ext.window.Window',
    alias: 'widget.caddevol',
    title: 'Cadastrar Valor de Devolução',
    width: 330,
    height: 300,
    align: 'stretch',
    modal: true,
    resizable: 'true',
    align: 'center',
    autoShow: true,
    autoScroll: true,
    plain: true,
    layout: 'fit',
    id: 'caddevol',

    requires: [
        'Ext.util.ComponentDragger',
        'Ext.util.Region',
        'Ext.ux.TextMaskPlugin',
        'Ext.EventManager',
        'Ext.tab.Panel'
    ],
    listeners: {
        //Acrecentar funções da Janela
       beforerender: function() {            

       }
    },
    items: [{
            xtype: 'form',
            labelWidth: 80,
            id: 'FormDev',
            frame: true,
            layout: 'vbox',
            defaultType: 'textfield',
            monitorValid: true,
            defaults: {
                padding: 2,
                anchor: '100%',
                margins: '3 0 0 0'
                    //width:490
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Tipo',
                    allowBlank: false,
                    value:'Devolução',
                    disabled: true
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Data',
                    name: 'dtdes',
                    id: 'dtdes',
                    format: 'd/m/Y',
                    allowBlank: false
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Valor',
                    name: 'vlrad',
                    id: 'vlrad',
                    plugins: 'textmask',
                    mask: 'R$ #9.999.990,00',
                    money: true,
                    allowBlank: false
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Drescrição',
                    name: 'trajeto',
                    id: 'trajeto'
                }
            ]
        }

    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function() {
                        var Abrgrid = Ext.getCmp('gridpre'); //grid abertura prestação
                        var selectedRecords = Abrgrid.getSelectionModel().getSelection();
                        var vSeqpre = selectedRecords[0].get("numseq");
                        var vNumcad = selectedRecords[0].get("numcad");
                        var vTiptrp = selectedRecords[0].get("tiptrp");

                        var vlrad = Ext.getCmp('vlrad').getValue();
                        var dtdes = Ext.getCmp('dtdes').getValue();
                        var trajeto = Ext.getCmp('trajeto').getValue();
                        var tipo = 3;

                        Ext.Ajax.request({
                            url: '/teste2/php/Prestacao/CadDevolucao.php',
                            method: 'post',
                            params: {

                                numcad: vNumcad,  
                                tiptra: vTiptrp, 
                                numseq: vSeqpre,
                                dtdes: dtdes,
                                trajeto: trajeto,
                                vlrad: vlrad,
                                tipo: tipo
                            },
                            success: function(response) {

                              var result = Ext.JSON.decode(response.responseText);                                
                              var form = Ext.getCmp('FormDev');
                              var outval = Ext.getCmp('caddevol');

                              if(result==0){
                                  Ext.Msg.alert('Mensagem','Cadastro realizado com sucesso');

                                  form.getForm().reset();
                                  outval.destroy();                    

                              }else{
                                  Ext.Msg.alert('Mensagem','Erro ao Cadastrar prestação'); 
                              }

                            },
                            failure: function() {

                            }

                        });
                    } //Fim da função click(hendler)
            },
            {
                text: 'Fechar',
                iconCls: 'icon-fechar',
                handler: function() {

                    var form = Ext.getCmp('FormDev');
                    var outval = Ext.getCmp('caddevol');

                    form.getForm().reset();
                    outval.destroy();
                }
            }
        ]
    }]

});