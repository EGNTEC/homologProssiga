Ext.define('desloc.store.testeS', {
    extend: 'Ext.data.Store',

    //storeId: 'regStore',   

    model: 'desloc.model.testM',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/teste2/php/status.php',

        reader: {
            type: 'json',
            root: 'data'

        }

    }

});