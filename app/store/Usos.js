Ext.define('desloc.store.Usos', {
    extend: 'Ext.data.Store',

    model: 'desloc.model.Uso',

    proxy: {
        type: 'ajax',
        url: '/teste2/php/listUso.php',

        reader: {
            type: 'json',
            root: 'data'

        }

    }

});