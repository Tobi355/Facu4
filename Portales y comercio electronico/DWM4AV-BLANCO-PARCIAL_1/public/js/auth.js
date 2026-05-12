

const Auth = {
  
  register(nombre, email, password, telefono = '') {

    if (!nombre || !email || !password) {
      return { success: false, message: 'Todos los campos son obligatorios' };
    }

    if (password.length < 6) {
      return { success: false, message: 'La contraseña debe tener al menos 6 caracteres' };
    }

    if (!this.validateEmail(email)) {
      return { success: false, message: 'Email inválido' };
    }

    const users = Storage.get(Storage.KEYS.USERS) || [];

    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'El email ya está registrado' };
    }

    const newUser = {
      id: Storage.generateId(),
      nombre: nombre.trim(),
      email: email.toLowerCase().trim(),
      password: password,
      telefono: telefono.trim(),
      fechaRegistro: new Date().toISOString(),
      estado: 'activo',
      role: 'user'
    };

    users.push(newUser);
    Storage.set(Storage.KEYS.USERS, users);

    this.login(email, password);

    return { success: true, message: 'Usuario registrado exitosamente', user: newUser };
  },

  
  login(email, password) {
    if (!email || !password) {
      return { success: false, message: 'Email y contraseña son obligatorios' };
    }

    const emailTrimmed = email.toLowerCase().trim();

    const admin = Storage.get(Storage.KEYS.ADMIN);
    if (admin && emailTrimmed === admin.email.toLowerCase() && password === admin.password) {
      return { success: false, message: 'El acceso administrativo se realiza desde el login de administradores.' };
    }

    const users = Storage.get(Storage.KEYS.USERS) || [];
    const user = users.find(u => u.email.toLowerCase() === emailTrimmed && u.password === password);

    if (!user) {
      return { success: false, message: 'Email o contraseña incorrectos' };
    }

    if (user.estado !== 'activo') {
      return { success: false, message: 'Usuario inactivo. Contacte al administrador.' };
    }

    const session = {
      userId: user.id,
      email: user.email,
      nombre: user.nombre,
      loginTime: new Date().toISOString(),
      isAdmin: false,
      role: user.role || 'user'
    };

    Storage.set(Storage.KEYS.SESSION, session);

    const redirectUrl = session.role === 'admin' ? 'admin.html' : 'perfil.html';
    return {
      success: true,
      message: 'Bienvenido',
      user: { ...user, password: undefined },
      redirectUrl
    };
  },

  
  loginAdminInternal(admin) {
    const session = {
      adminId: 'admin',
      email: admin.email,
      nombre: admin.nombre || 'Administrador',
      loginTime: new Date().toISOString(),
      isAdmin: true,
      role: 'admin'
    };

    Storage.set(Storage.KEYS.SESSION, session);

    return {
      success: true,
      message: 'Bienvenido Administrador',
      redirectUrl: 'admin.html'
    };
  },

  
  loginAdmin(email, password) {
    const admin = Storage.get(Storage.KEYS.ADMIN);

    if (!admin) {
      return { success: false, message: 'Configuración de administrador no encontrada' };
    }

    if (email.toLowerCase().trim() !== admin.email.toLowerCase() || password !== admin.password) {
      return { success: false, message: 'Credenciales de administrador incorrectas' };
    }

    return this.loginAdminInternal(admin);
  },

  
  logout() {
    Storage.delete(Storage.KEYS.SESSION);
    window.location.href = 'index.html';
  },

  
  isAuthenticated() {
    const session = Storage.get(Storage.KEYS.SESSION);
    return session !== null;
  },

  
  isAdmin() {
    const session = Storage.get(Storage.KEYS.SESSION);
    return session !== null && session.isAdmin === true;
  },

  
  getCurrentUser() {
    const session = Storage.get(Storage.KEYS.SESSION);
    if (!session || session.isAdmin) {
      return null;
    }

    const users = Storage.get(Storage.KEYS.USERS) || [];
    return users.find(u => u.id === session.userId);
  },

  
  getSession() {
    return Storage.get(Storage.KEYS.SESSION);
  },

  
  updateProfile(userId, data) {
    const users = Storage.get(Storage.KEYS.USERS) || [];
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return { success: false, message: 'Usuario no encontrado' };
    }

    if (data.nombre) users[userIndex].nombre = data.nombre.trim();
    if (data.telefono) users[userIndex].telefono = data.telefono.trim();
    if (data.email) {

      const existingUser = users.find(u => u.email === data.email && u.id !== userId);
      if (existingUser) {
        return { success: false, message: 'El email ya está en uso' };
      }
      users[userIndex].email = data.email.toLowerCase().trim();

      const session = Storage.get(Storage.KEYS.SESSION);
      if (session && session.userId === userId) {
        session.email = data.email.toLowerCase().trim();
        session.nombre = data.nombre || session.nombre;
        Storage.set(Storage.KEYS.SESSION, session);
      }
    }
    if (data.password && data.password.length >= 6) {
      users[userIndex].password = data.password;
    }

    Storage.set(Storage.KEYS.USERS, users);

    return { success: true, message: 'Perfil actualizado exitosamente' };
  },

  
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  
  requireAuth(redirectUrl = 'login.html') {
    if (!this.isAuthenticated()) {
      window.location.href = redirectUrl;
      return false;
    }
    return true;
  },

  
  requireAdmin(redirectUrl = 'admin-login.html') {
    if (!this.isAdmin()) {
      window.location.href = redirectUrl;
      return false;
    }
    return true;
  },

  
  redirectIfAuthenticated(userUrl = 'perfil.html', adminUrl = 'admin.html') {
    const session = Storage.get(Storage.KEYS.SESSION);
    if (!session) return false;

    if (session.isAdmin) {
      window.location.href = adminUrl;
      return true;
    }
    if (this.isAuthenticated()) {
      window.location.href = userUrl;
      return true;
    }
    return false;
  },

  
  getRole() {
    const session = Storage.get(Storage.KEYS.SESSION);
    if (!session) return null;
    return session.role || (session.isAdmin ? 'admin' : 'user');
  }
};
