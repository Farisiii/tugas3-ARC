const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

const history = [];

const askForOperation = () => {
  return new Promise((resolve) => {
    const validOperations = Object.keys(operations).concat(["clear", "exit"]);

    rl.question(
      'Masukkan operasi (+, -, *, /) atau "clear" untuk membersihkan histori, atau "exit" untuk keluar: ',
      (answer) => {
        if (validOperations.includes(answer)) {
          resolve(answer);
        } else {
          console.log(
            "Pilihan operasi tidak valid. Silahkan masukkan pilihan yang tersedia."
          );
          resolve();
        }
      }
    );
  });
};

const askForNumber = (message) => {
  return new Promise((resolve) => {
    rl.question(message, (number) => {
      const parsedNumber = parseFloat(number);
      if (!isNaN(parsedNumber)) {
        resolve(parsedNumber);
      } else {
        console.log("Nilai tidak valid. Masukkan angka yang valid.");
        resolve();
      }
    });
  });
};

const calculate = async (operation, a, b) => {
  return new Promise((resolve) => {
    rl.question(
      `Apakah Anda yakin ingin melakukan ${a} ${operation} ${b}? (y/n) `,
      (answer) => {
        if (answer === "y") {
          const result = operations[operation](a, b);
          console.log(`Hasil ${a} ${operation} ${b} adalah ${result}.`);

          history.push({
            operation,
            a,
            b,
            result,
          });
          console.log("Riwayat operasi:");
          for (const operation of history) {
            console.log(
              `${operation.a} ${operation.operation} ${operation.b} = ${operation.result}`
            );
          }

          resolve();
        } else {
          console.log("Operasi dibatalkan.");
          resolve();
        }
      }
    );
  });
};

const askForClearHistory = () => {
  return new Promise((resolve) => {
    rl.question("Apakah Anda ingin menghapus riwayat? (y/n) ", (answer) => {
      if (answer === "y" || answer === "n") {
        resolve(answer);
      } else {
        console.log(
          "Pilihan tidak valid. Silahkan masukkan pilihan yang tersedia."
        );
        resolve();
      }
    });
  });
};

const askForContinue = () => {
  return new Promise((resolve) => {
    rl.question("Apakah Anda ingin melanjutkan kalkulasi? (y/n) ", (answer) => {
      if (answer === "y" || answer === "n") {
        resolve(answer);
      } else {
        console.log(
          "Pilihan tidak valid. Silahkan masukkan pilihan yang tersedia."
        );
        resolve();
      }
    });
  });
};

const clearHistory = () => {
  history.length = 0;
  console.log("History telah bersih.");
};

const main = async () => {
  try {
    while (true) {
      let operation;
      do {
        operation = await askForOperation();
      } while (!operation);

      if (operation === "clear") {
        clearHistory();
        continue;
      } else if (operation === "exit") {
        break;
      }

      const a = await askForNumber("Masukkan nilai pertama: ");
      if (isNaN(a)) {
        continue;
      }

      const b = await askForNumber("Masukkan nilai kedua: ");
      if (isNaN(b)) {
        continue;
      }

      await calculate(operation, a, b);

      const clearHistoryChoice = await askForClearHistory();
      if (clearHistoryChoice === "y") {
        clearHistory();
      }

      const continueChoice = await askForContinue();
      if (continueChoice !== "y") {
        break;
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    rl.close();
  }
};

main();
