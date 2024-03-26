import User from './user.model.js';

try {
  const user = await User.create({ first_name: 'Moshe', last_name: 'Siegel' });
} catch (error) {
  console.error('Unable to creat user:', error);
}
