Ext.define('desloc.store.unidAdmRegS', {
    extend: 'Ext.data.Store',

    model: 'desloc.model.unidAdmRegM',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/teste2/php/listUnAdmReg.php',

        reader: {
            type: 'json',
            root: 'data'

        }

    }

});