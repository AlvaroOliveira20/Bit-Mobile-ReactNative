function maskCpf (value: string){
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{9})(\d{1})/, "$1-$2");
    value = value.replace(/^(\d{6})(\d{1})/, "$1.$2");
    value = value.replace(/^(\d{3})(\d{1})/, "$1.$2");

    return value
}
function maskValor (value: string){
    value = value.replace(/\D/g, "");
    if ( value.length > 2 )
    value = value.replace(/([0-9]{2})$/g, ",$1")
    if( value.length > 6 )
        value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    value = "R$ - "  + value
    return value
}

export { maskCpf, maskValor }