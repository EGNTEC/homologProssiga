Ext.define('desloc.model.cargosGestao.inserirCadPresGestCR',{
    extend:'Ext.data.Model',
    fields:[

       {name:'numseq'},
       {name:'seqpla'},
       {name:'datpre', type: 'date', dateFormat: 'd/m/Y'},
       {name:'qtdcli'},
       {name:'quilometro'},
       {name:'vlrdes' ,type:'float'},
       {name:'juspre'},
       {name:'seqpre'},
       {name:'valpass'},
       {name:'destrp'},
       {name:'tiptrp'},
       {name:'numevt'},
       {name:'odoini'},
       {name:'odofim'},
       {name:'desevt'},
       {name:'Coluna1'},
       {name:'Coluna2'}
    ],
    idProperty:'numseq'
});
