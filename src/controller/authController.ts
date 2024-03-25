import auth from '@react-native-firebase/auth';

export const signUp = (email: string, password: string, confirmPassword: string) => {
	auth()
		.createUserWithEmailAndPassword(email, password, confirmPassword)
		.then(() => { console.log('succesfully registered new user !'); })
		.catch(error => {
			if (error.code === 'auth/email-already-in-use') {
				console.log('That email address is already in use!');
			}

			if (error.code === 'auth/invalid-email') {
				console.log('That email address is invalid!');
			}
		});
};

export const signIn = async (email: string, password: string) => {
	try {
		const userCredential = await auth().signInWithEmailAndPassword(
			email,
			password,
		);
		const user = userCredential.user;
		console.log("Logged In as ::>>", user);
	} catch (error) {
		console.error('Login error::>>', error);
	}
};
