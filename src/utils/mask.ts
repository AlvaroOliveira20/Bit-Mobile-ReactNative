function maskCpf (value: string){
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{9})(\d{1})/, "$1-$2");
    value = value.replace(/^(\d{6})(\d{1})/, "$1.$2");
    value = value.replace(/^(\d{3})(\d{1})/, "$1.$2");

    return value
}

export { maskCpf }