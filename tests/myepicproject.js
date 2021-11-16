const anchor = require("@project-serum/anchor");
const { SystemProgram } = require("@solana/web3.js");

const main = async() => {
  console.log("🚀 starting test...");

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Myepicproject;

  //account keypair for program to use
  const baseAccount = anchor.web3.Keypair.generate();

  let tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    },
    signers: [baseAccount]
  });

  console.log("📝 Your transaction signature", tx);

  //fetch data from the account
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 GIF Count', account.totalGifs.toString());

  await program.rpc.addGif("https://media0.giphy.com/media/JLYQnbND9gkYU/200w.webp?cid=ecf05e470bklfms9b5be913kodno9a10s0rxcg8bjcpp4h3m&rid=200w.webp&ct=g", {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    }
  })

  // Get the account again to see what changed.
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 GIF Count', account.totalGifs.toString());
  // Access gif_list on the account!
  console.log('👀 GIF List', account.gifList)
}

const runMain = async() => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();