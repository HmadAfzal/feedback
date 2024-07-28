export const  getFirstName=(name: string)=> {
    const names = name.split(' ');
    return names.length > 1 ? names[0] : name;
  }
