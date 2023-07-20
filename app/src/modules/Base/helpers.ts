export function arrayUnique(data: any[]): any[]
{
    return data.filter((n, i) => data.indexOf(n) === i);
}