Ext.define('desloc.view.cargosGestao.ConfirmJustGO', {
    extend: 'Ext.window.Window',
    alias: 'widget.confjust',
    title: 'Justificativa',
    height: 350,
    width: 450,
    align: 'stretch',
    modal: true,
    resizable: 'true',
    align: 'center',
    autoShow: true,
    layout: 'fit',
    id: 'confjust',

    requires: [
        'Ext.util.ComponentDragger',
        'Ext.util.Region',
        'Ext.EventManager',
        'Ext.tab.Panel'
    ],
    items: [{
        xtype: 'form',
        id: 'formconf',
        layout: 'fit',
        defaults: {
            padding: 2,
            anchor: '100%',
            margins: '3 0 0 0'
                //width:490
        },
        items: [{
            xtype: 'textareafield',
            name: 'just',
            id: 'just',
            disabled: true
        }]
    }],
    listeners: {

        beforerender: function() {
            if (codcargo == 6500) {
                var sPanelGridGer = Ext.getCmp('gridpreGestGO');    
            }else{
                var sPanelGridGer = Ext.getCmp('gridpreGestCR');                            
            }

            var selectedRecords = sPanelGridGer.getSelectionModel().getSelection();
            var stpre = selectedRecords[0].get("stspre");
            juspre = selectedRecords[0].get("juspre");

            var comboSts = Ext.getCmp('statusCombo');
            var comboStatus = comboSts.getValue();
            Ext.getCmp('just').setValue(juspre);

        },
        beforeclose: function() {
            //alert('teste');
            Ext.getCmp('confjust').destroy();
        }
    }

});