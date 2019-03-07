function cat(name: string, color?: string): string {
    if(!color)
        return `${name} meows`;
    else
        return `${color} ${name} meows`;
}

console.log(cat("Lara"));
console.log(cat("tina", "Yellow"));