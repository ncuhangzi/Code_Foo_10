# Hisui's New Power Plant
As we known Jubilife Village become the most modernized city in the Sinnoh region (known back then as the Hisui region) in the future. Building a strong power infrastructure is essential to achieving this future, and therefore our goal of creating power plants using Voltrob is a highly visionary idea. This problem can simply calculate with this simple formula, **Number of Voltorbs** = (Power requirement of the village (in kWh)) / (Power output of a single Voltorb (in kWh)). So we have two subproblems to solve, which is the **required power of the village** and the **output power of a voltorb**.  
   
## Power output of a single Voltorb
Voltorb is a pokemon living in the Coronet Highlands which is near by the Jubilife Village. Unlike Kantonian Voltorb, they have friendly and excitable temperaments(BulbaGarden). Although we cannot confirm the exact amount of electricity a Voltorb can generate, we can hypothesize that its most powerful move, "Discharge," is used to generate power. In the game Pokémon Legends: Arceus, "Discharge" has the same power as "Thunderbolt," which in Japanese is expressed as "１０まんボルト" which means 100,000 volts. Based on this information, we can assume that a Voltorb can generate up to 100,000 volts of electricity.  
We also assume Voltorb put out 100kv with 100ma which means it can generate **10kW** of electricity power. Moreover, the pp for "Discharge" is 15, we assume that after using five it will need to take 5 turns to take a rest. The capacity factor is still pretty high, 15/20 = 0.75. And we can even smooth out the impact by using several Voltorbs in parallel.
![alt text](https://i.imgur.com/0MHQKE3.jpg)
    
## Power requirement of the village
Let us assume the structure of electricity consumption in Japan is 33.5% in the industrial sector, 30.6% in the residential sector, and 34.0% in the service sector. And the electricity usage per capita in Hisui area is 20.57kw. (Source: WorldData.info Japan electricity uasge per capita).   
![alt text](https://i.imgur.com/GyHxHwY.png) (Source: https://yakkun.com/legends_arceus/map.htm?place=kotobuki)
- residential sector: I assume the large house with 5 residents, middle size with 3, and small size with 2. There are in total 45 residents in the residential area. The total electricity usage in this area will be 925.65kw.
- industrial sector: According to the structure of electricity consumption in Japan, the electricity usage of industrial sector might be (925.65/30.6)*33.5 = 1013.375kw.
- service sector: And for the consumption of service sector might be (925.65/30.6)*34 = 1028.5kw.  
Therefore, the total power requirement of the village will be 925.65+1013.375+1028.5 = **2967.525kw** = 2.96MW.

## Plan of building the power plant
With the power output of a single Voltorb and power requirement of the village we can easily calculate the number of Voltorbs we need by simply divide them both.   
2967.525kw / 10kw = 296.7525 ≈ 297.  
We need to catch **297** Voltorbs to fully power the village.

![alt text](https://i.imgur.com/v8BoEEY.jpg)

