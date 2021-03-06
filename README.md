# [ask-open-data.ch](https://ask-open-data.ch)

_Empowering citizens by making access to Open Government Data accessible, visualizations easy to understand. Also, reaching everyone through an auto generated ad campaign._

This was a project for HackZurich 2021. It won the "Empower Citizens with Open Government Data" challenge.

## Resources

- [Online demo](https://ask-open-data.ch)
- [Pitch from HackZurich](https://www.youtube.com/watch?v=4Hs5uUbQ62E)
- [Article from Open Government Data Zurich](https://www.stadt-zuerich.ch/portal/de/index/ogd/anwendungen/2021/askopendata.html)
- [Backend code](https://github.com/tehwalris/open-data-backend)
- [Static deployment code](https://github.com/tehwalris/open-data-static)

## Inspiration

Open Government Data has been getting more popular in the last few years. But in many cases, its just huge tables to scroll through or even worse some convoluted APIs to call from which ordinary people won’t ever be able to benefit.

This is why we developed AskOpenData.

## What it does

Its 3 main goals are to allow ordinary users to discover OGD and through good visualizations, understand the underlying facts. At the same time, we want the data and visualizations to be correct and trusted.

A user can search for data visualizations with a Natural Language Input and view them. They can also share the visualizations in the form of a poster which is identical to the ones used in a fictitious ad-campaign we designed to make AskOpenData known to the public.

## Developer documentation

For step-by-step instructions to host your own version, see [./doc/developing.md](./doc/developing.md).

## Data

Currently, the following datasets are integrated:

- Stündlich aktualisierte Luftqualitätsmessungen, seit 1983 ([Link](https://data.stadt-zuerich.ch/dataset/ugz_luftschadstoffmessung_stundenwerte))
- Viertelstundenwerte zum Bruttolastgang elektrische Energie der Stadt Zürich ([Link](https://data.stadt-zuerich.ch/dataset/ewz_bruttolastgang_stadt_zuerich))
- Gang dur Züri: Statistische Kennzahlen für Schulen ([Link](https://data.stadt-zuerich.ch/dataset/prd_ssz_gang-dur-zueri_od1005))
- Hundebestand der Stadt Zürich ([Link](https://data.stadt-zuerich.ch/dataset/sid_stapo_hundebestand))
