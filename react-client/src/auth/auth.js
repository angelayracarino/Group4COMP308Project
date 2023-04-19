export const Authentication = {
	saveToken(userToken) {
		localStorage.setItem('token', userToken);
	},

	getToken() {
		const userToken = localStorage.getItem('token');
		return userToken;
	},

	removeToken() {
		localStorage.removeItem('token');
	},
};
// export default Authentication;
