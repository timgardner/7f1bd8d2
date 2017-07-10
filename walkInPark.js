function walkInPark() {
  for (let i = 1; i <= 100; i++) {
    const divisibleBy4 = i % 4 == 0;
    const divisibleBy5 = i % 5 == 0;

    if(divisibleBy4 && divisibleBy5) {
      console.log('HelloWorld');
    } else if (divisibleBy4) {
      console.log('Hello');
    } else if (divisibleBy5) {
      console.log('World');
    } else {
      console.log(i);
    }
  }
}

walkInPark();