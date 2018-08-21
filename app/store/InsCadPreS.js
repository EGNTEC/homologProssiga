Ext.define('desloc.store.InsCadPreS', {
    extend: 'Ext.data.Store',

    //storeId: 'regStore',   

    model: 'desloc.model.InsCadPreM',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/teste2/php/Prestacao/ListCadPre.php',

        reader: {
            type: 'json',
            root: 'data'

        }

    }

});