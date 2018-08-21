Ext.define('desloc.store.UnidadeAdicionalS',{
    extend: 'Ext.data.Store',
    
    model:'desloc.model.UnidadeAdicionalM',

    //autoLoad:true,
    
    proxy: {
        type:'ajax', 
        url: '/teste2/php/UnidadeAdicional.php',

        reader: {
            type:'json',
            root:'data'
        }
    }

});