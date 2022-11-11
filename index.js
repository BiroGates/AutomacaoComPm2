import promptSync from 'prompt-sync';
import { readFileSync } from 'fs';
import { exec } from 'child_process';
 

function loadPorts() {
    const ports = JSON.parse(readFileSync('webserver.json'));
    return ports;
}

function showMessage() {
    console.log('| / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / | ');
    console.log('| Escolha uma ação:                                               |');
    console.log('|                                                                 |');
    console.log('| Iniciar servidores INFOA digite: 1                              |');
    console.log('| Iniciar servidores INFOB digite: 2                              |');
    console.log('| Iniciar servidores INFOC digite: 3                              |');
    console.log('| Iniciar servidores INFOD digite: 4                              |');
    console.log('|                                                                 |');
    console.log('| Reniciar todos os processos digite: 5                           |');
    console.log('| Eliminar todos os processos digite: 6                           |');
    console.log('|                                                                 |');
    console.log('| Mostar todos os processos rodando: 7                            |');
    console.log('| Sair digite: 0                                                  |');
    console.log('|                                                                 |');
    console.log('| / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / | ');
}

function chooseAction(ports, action) {
    if(action < 0 || action > 7) throw new Error('Por favor digite uma ação valida!');
    
    switch(action){
        case 1: startServer(ports.infoa, 'INFOA'); break
        case 2: startServer(ports.infob, 'INFOB'); break
        case 7: showStatus() ;
    }
}

function startServer(classroom, name) {
    for(const item in classroom) {
        exec(`pm2 serve ${item} ${classroom[item]} --name ${item}-${name}`);
    }
}


main();
function main() {
    try {
        const ports = loadPorts();
        const readLine = promptSync();
        
        // Greetings
        showMessage();
        
        while(true){
            process.stdout.write('| Escolha sua ação: ');
            let action = Number(readLine());
            
            chooseAction(ports, action);
            
            if(action === 0) break;
        }
    } catch (error) {
        console.log(error);
    }
}