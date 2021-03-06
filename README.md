# uOttaHack 2018: LightShow.eth
### Smart-contract co-operative city lighting system.

#### Team Members:
- Dylan Cooper
- Kaustav Haldar
- Quinn Ingram
- Ryan Fleck

#### Table Of Contents:
1. Overview
2. Examples
3. Quickstart
4. Troubleshooting 

## **1. Overview:**

LightShow.eth is an interactive art project meant for smart cities!

Our proof of concept implementation leverages IoT and blockchains to offer a way for the public to interact with the city around them, augmenting their actual reality to enjoy their environment better and driving public engagement.

We envision interactive art projects the public can change and modify using their smart phones and other means.

Our project features a 3d printed canada leaf with RGB leds behind it connected to an arduino and wired up to run on events on the ethereum blockchain that come in as people trigger our smart contract.

The use of the ethereum blockchain: - lines up with the governments open data initiatives, opening up a historic view of public engagement with art instalments and spending at them, while saving the govt money since they dont need to host and serve all this data themselves - prevents abuse of these systems by creating financial discentives of weaponizing say light based art projects against people with epilepsy or wasting electricity - incentivizes the artists with profit from the installment, and pays for upkeep and the public record can motivate other artists

## 2. Examples
- **Lights in a park** the public can change the hue of depending on their mood - lights in a park that are kept at a low level and increased depending on people showing up or requesting more light 
- **Charity activated christmas tree lights** that illuminate as people contribute, public near the tree are motivated to contribute using easy cryptocurrency based donation mechanisms as the tree lighting slows down as the goal is neared - Fun group based art projects that many people interact with to turn on or complete a light based puzzle
- We want to improve, document and open source our code and methods for artists to be able to freely pick up and use to further their artistic endeavours. Also possibly set it up in the **makerspace at uOttawa**.

## 3. Quickstart

1. Connect the arduino 
2. Start testrpc.  

Console 1:
```
npm i -g ethereumjs-testrpc
testrpc

// copy one of the privkeys

```
Console 2:
```
npm i
node js/server2.js <address privKey> <string y isDevMode> <string y runArduino>

```

Navigate to `localhost:3000` to trigger the block chain event again. 

## 4. Troubleshooting

1. Ensure the serial port for the Arduino is correct in server2.js, on line **20**:
```
function startArduino() {
	arduino = new SerialPort("/dev/ttyACM0",9600);
}
```
2. If needed, test the LEDs controlled by the Arduino by running `node red.js`, `blue.js`, `green.js`.
