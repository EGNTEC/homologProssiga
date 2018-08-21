Ext.define('desloc.store.dadosColabS', {
    extend: 'Ext.data.Store',

    model: 'desloc.model.dadosColabM',

    //autoLoad:true,

    proxy: {
        type: 'ajax',
        url: '/teste2/php/autent.php',

        reader: {
            type: 'json',
            root: 'data'

        }

    }

});