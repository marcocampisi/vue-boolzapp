const { createApp } = Vue;
const { DateTime } = luxon;

createApp({
    data() {
        return{
            newMessage : '',
            searchQuery : '',
            contacts: [
                {
                name: 'Michele',
                avatar: './img/avatar_1.jpg',
                visible: false,
                lastSeen: '12:00',
                messages: [
                {
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
                },
                {
                date: '10/01/2020 15:50:00',
                message: 'Ricordati di stendere i panni',
                status: 'sent'
                },
                {
                date: '10/01/2020 16:15:22',
                message: 'Tutto fatto!',
                status: 'received'
                }
                ],
                },
                {
                name: 'Fabio',
                avatar: './img/avatar_2.jpg',
                visible: false,
                lastSeen: '13:00',
                messages: [
                {
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
                },
                {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
                },
                {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent'
                }
                ],
                },
                {
                name: 'Samuele',
                avatar: './img/avatar_3.jpg',
                visible: false,
                lastSeen: '14:00',
                messages: [
                {
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
                },
                {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
                },
                {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received'
                }
                ],
                },
                {
                name: 'Alessandro B.',
                avatar: './img/avatar_4.jpg',
                visible: false,
                lastSeen: '15:00',
                messages: [
                {
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
                },
                {
                date: '10/01/2020 15:50:00',
                message: 'Si, ma preferirei andare al cinema',
                status: 'received'
                }
                ],
                },
                {
                name: 'Alessandro L.',
                avatar: './img/avatar_5.jpg',
                visible: false,
                lastSeen: '16:00',
                messages: [
                {
                date: '10/01/2020 15:30:55',
                message: 'Ricordati di chiamare la nonna',
                status: 'sent'
                },
                {
                date: '10/01/2020 15:50:00',
                message: 'Va bene, stasera la sento',
                status: 'received'
                }
                ],
                },
                {
                name: 'Claudia',
                avatar: './img/avatar_6.jpg',
                visible: false,
                lastSeen: '17:00',
                messages: [
                {
                date: '10/01/2020 15:30:55',
                message: 'Ciao Claudia, hai novità?',
                status: 'sent'
                },
                {
                date: '10/01/2020 15:50:00',
                message: 'Non ancora',
                status: 'received'
                },
                {
                date: '10/01/2020 15:51:00',
                message: 'Nessuna nuova, buona nuova',
                status: 'sent'
                }
                ],
                },
                {
                name: 'Federico',
                avatar: './img/avatar_7.jpg',
                visible: false,
                lastSeen: '18:00',
                messages: [
                {
                date: '10/01/2020 15:30:55',
                message: 'Fai gli auguri a Martina che è il suo compleanno!',
                status: 'sent'
                },
                {
                date: '10/01/2020 15:50:00',
                message: 'Grazie per avermelo ricordato, le scrivo subito!',
                status: 'received'
                }
                ],
                },
                {
                name: 'Davide',
                avatar: './img/avatar_8.jpg',
                visible: false,
                lastSeen: '19:00',
                messages: [
                {
                date: '10/01/2020 15:30:55',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                status: 'received'
                },
                {
                date: '10/01/2020 15:50:00',
                message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                status: 'sent'
                },
                {
                date: '10/01/2020 15:51:00',
                message: 'OK!!',
                status: 'received'
                }
                ],
                }
                ],
                selectedContact : {},
                showContextMenu : false,
                contextMenuTop : 0,
                contextMenuLeft : 0,
                currentMessage : null
        }
    },
    computed : {
        getLastMessage() {
            return (contact) => {
                const messages = contact.messages;
                if (messages.length > 0) {
                    const lastMessage = messages[messages.length - 1];
                    return lastMessage.message;
                }
                return 'Nessun messaggio';
            }
        },
        filteredContacts() {
            const query = this.searchQuery.toLowerCase();
            return this.contacts.filter(contact => contact.name.toLowerCase().includes(query));
          }
    },
    methods : {
        openChat(contact) {
            this.selectedContact = contact;
        },
        sendMessage() {
            if (this.newMessage.trim() !== '') {
              const currentDate = DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss');
              const newSentMessage = {
                date: currentDate,
                message: this.newMessage,
                status: 'sent'
              };
              this.selectedContact.messages.push(newSentMessage);
              this.newMessage = '';
        
              setTimeout(() => {
                const newReceivedMessage = {
                  date: DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'),
                  message: 'Ok',
                  status: 'received'
                };
                this.selectedContact.messages.push(newReceivedMessage);
              }, 3000);
            }
          },
          openContextMenu(message, e) {
            e.preventDefault();
            this.contextMenuTop = e.clientY + 'px';
            this.contextMenuLeft = e.clientX + 'px';
            this.currentMessage = message;
            this.showContextMenu = true;
          },
          deleteMessage(message) {
            if (this.currentMessage) {
              const index = this.selectedContact.messages.indexOf(this.currentMessage);
              if (index !== -1) {
                this.selectedContact.messages.splice(index, 1);
              }
            }
            this.showContextMenu = false;
          }
    }
}).mount('#app');