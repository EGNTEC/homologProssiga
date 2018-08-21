use Prossiga
go

'select	func.nomfun, 'Planejamento - Aguardando Abertura'
from	tVTRHfunc func
where	func.codcar in (7700, 7600)
and		not exists (select 1 from tPROSabpl abpl
						where	abpl.matfun = func.numcad
						and		substring (convert (varchar(10), abpl.datpla,111),1,7) = substring (convert (varchar(10), getdate(), 111),1,7))
and		func.numloc = ' + 222 +
'union
select	func.nomfun,
		case abpr.stspre
			when 0 then 'Prestacao - Pendente Finalizacao'
			when 1 then 'Prestacao - Aguardando Autorizacao.'
			when 2 then 'Prestacao - Aguardando Validacao'
			when 3 then 'Prestacao - Aguardando Val.Adm.'
			when 4 then 'Planejamento - Aguardando Abertura'
		end
from	tPROSabpr abpr
			inner join tPROSabpl abpl on
				abpl.numseq = abpr.seqpla
			inner join tVTRHfunc func on
				func.numcad = abpr.matfun
where	abpl.numseq = (select max(numseq) from tPROSabpl abpl2
						where	abpl2.numreg = abpl.numreg
						and		abpl2.numloc = abpl.numloc
						and		abpl2.matfun = abpl.matfun)
and		substring (convert (varchar(10), abpr.datpre,111),1,7) = substring (convert (varchar(10), getdate(), 111),1,7)
and		abpr.numloc = ' + 222 +
'union
select	func.nomfun,
		case abpl.stspla
			when 0 then 'Planejamento - Pendente Finalizacao'
			when 1 then 'Planejamento - Aguardando Autorizacao.'
			when 2 then 'Planejamento - Aguardando Validacao'
			when 3 then 'Planejamento - Aguardando Autorizacao'
			when 4 then 'Planejamento - Aguardando Pagamento'
		end
from	tPROSabpl abpl
			inner join tVTRHfunc func on
				func.numcad = abpl.matfun
where	abpl.numseq = (select max(numseq) from tPROSabpl abpl2
						where	abpl2.numreg = abpl.numreg
						and		abpl2.numloc = abpl.numloc
						and		abpl2.matfun = abpl.matfun)
and		not exists (select 1 from tPROSabpr abpr
						where abpr.seqpla = abpl.numseq)
and		substring (convert (varchar(10), abpl.datpla,111),1,7) = substring (convert (varchar(10), getdate(), 111),1,7)
and		abpl.numloc = ' + 222


