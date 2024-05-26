import { useSelector } from "react-redux";
import { selectUser } from "../app/auth/user/store/userSlice";

//const user = useSelector(selectUser);

const locale = {
	USERTITTLE: 'Usuarios',
	GRETTING: 'Bienvenido',
	TASKQUANTITY: 'Tienes 2 mensajes y 15 tareas nuevas, las revisamos?',
	BTNMESG: 'Mensajes',
	BTNSTG: 'Configuraciones',
	COMPOSE: "Hola {{rol}},  estamos felices de tenerte aqui de nuevo!!",
	FILTERS: 'Filters',
	LABELS: 'Labels',
	NO_MESSAGES: 'There are no messages!',
	SEARCH_PLACEHOLDER: 'Search for an e-mail or task',
	INBOX: 'Inbox',
	SENT: 'Sent',
	DRAFTS: 'Drafts',
	SPAM: 'Spam',
	TRASH: 'Trash',
	STARRED: 'Starred',
	IMPORTANT: 'Important'
};

export default locale;