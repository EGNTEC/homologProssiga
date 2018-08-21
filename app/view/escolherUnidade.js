Ext.onReady(function() {
    Ext.QuickTips.init();

    

    var login = new Ext.FormPanel({
        labelWidth: 80,
        frame: true,
        bodyPadding: 8,
        items: [

            {
                xtype: 'combo',
                editable: false,
                width: 210,
                id: 'undadicional',
                fieldLabel: 'Unidade',
                displayField: 'nomloc',
                valueField: 'numloc',
                store: Ext.create('desloc.store.UnidadeAdicionalS'),
                triggerAction: 'all',
                totalProperty: 'total',
                mode: 'local',
                listeners: {
                   
                }
            }
        ],
        buttons: [{
            text: 'Entrar',
            handler: function() {
                
            }
        }]

    });

    var win = new Ext.Window({
        layout: 'fit',
        title: 'Selecionar Unidade',
        width: 300,
        height: 150,
        closable: false,
        resizable: false,
        items: [login]

    });
    win.show();
});