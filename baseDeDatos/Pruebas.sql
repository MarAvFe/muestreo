insert into samplingtype(name, initials)
values('Crew Balance', 'CB');
call pInsert_Sampling('Muestreo 01 - ejemplo', 'MT01', 1);
call pUpdate_PreSampling (1,30,0,0,0,0,0,0,0);
call pInsert_Schedule ('08:00:00', '16:00:00', 1);
call pInsert_Group ('Aulas', 1);
call pInsert_Trail('08:10:00', 1, 1);
call pUpdate_DefSampling (1,0,0,0,0,0,0,0);