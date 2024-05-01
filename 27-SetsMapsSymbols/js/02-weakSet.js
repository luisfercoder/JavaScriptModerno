//Waek set

const waekSet = new WeakSet();
const cliente = {
  nombre:'Fernando',
  saldo: 100
}

waekSet.add(cliente);

console.log(waekSet);