Ext.define('desloc.store.HistSldoS', {
    extend: 'Ext.data.Store',

    model: 'desloc.model.HistSldoM',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/teste2/php/HistSldo.php',

        reader: {
            type: 'json',
            root: 'data'

        }

    }

});