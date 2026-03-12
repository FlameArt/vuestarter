# Дизайн админ-панелей и внутренней админки пользователей в SaaS-продуктах

Придерживайся этих цветов, композиции элементов и разбиения на компоненты (включая роутер).

## Стилистика табов
```
        <v-tabs
          class="custom-tabs bg-slate-50 text-slate-600"
          v-model="activeTab"
          align-tabs="center"
          color="indigo-lighten-2"
          :fixed-tabs="true"
        >
          <v-tab value="countries">Страны</v-tab>
          <v-tab value="cities">Города</v-tab>
          <v-tab value="places">Места</v-tab>
        </v-tabs>

        <v-card class="geo-tabs-card" elevation="0">
          <v-card-text>
            <v-window v-model="activeTab">
              <v-window-item value="countries">
                <div class="my-6"></div>
                <div class="pa-4 bg-white">
                   <CountriesTable />
                </div>
              </v-window-item>
              <v-window-item value="cities">
                <div class="my-6"></div>
                <div class="pa-4 bg-white">
                   <CitiesTable />
                </div>
              </v-window-item>
              <v-window-item value="places">
                <div class="my-6"></div>
                <PlacesTable />
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
```