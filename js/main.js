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
                date: '15:30',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
                },
                {
                date: '15:50',
                message: 'Ricordati di stendere i panni',
                status: 'sent'
                },
                {
                date: '16:15',
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
                date: '16:30',
                message: 'Ciao come stai?',
                status: 'sent'
                },
                {
                date: '16:30',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
                },
                {
                date: '16:35',
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
                date: '10:10',
                message: 'La Marianna va in campagna',
                status: 'received'
                },
                {
                date: '10:20',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
                },
                {
                date: '16:15',
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
                date: '15:30',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
                },
                {
                date: '15:50',
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
                date: '15:30',
                message: 'Ricordati di chiamare la nonna',
                status: 'sent'
                },
                {
                date: '15:50',
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
                date: '15:30',
                message: 'Ciao Claudia, hai novità?',
                status: 'sent'
                },
                {
                date: '15:50',
                message: 'Non ancora',
                status: 'received'
                },
                {
                date: '15:51',
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
                date: '15:30',
                message: 'Fai gli auguri a Martina che è il suo compleanno!',
                status: 'sent'
                },
                {
                date: '15:50',
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
                date: '15:30',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                status: 'received'
                },
                {
                date: '15:50',
                message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                status: 'sent'
                },
                {
                date: '15:51',
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
              const currentDate = DateTime.now().toFormat('mm:ss');
              const newSentMessage = {
                date: currentDate,
                message: this.newMessage,
                status: 'sent'
              };
              this.selectedContact.messages.push(newSentMessage);
              this.newMessage = '';
        
              setTimeout(() => {
                const newReceivedMessage = {
                  date: DateTime.now().toFormat('mm:ss'),
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