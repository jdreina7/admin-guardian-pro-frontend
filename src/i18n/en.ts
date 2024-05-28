import { useSelector } from "react-redux";
import { selectUser } from "../app/auth/user/store/userSlice";

//const user = useSelector(selectUser);

const locale = {
	USERTITTLE: 'Users',
	DASHTITTLE: 'Dashboard33',
	GRETTING: 'Welcome back',
	TASKQUANTITY: 'You have 2 new messages and 15 new tasks',
	BTNMESG: 'Messages',
	BTNSTG: 'Settings',
	COMPOSE:  "Hi {{rol}}, we are happy that you are here again!",
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