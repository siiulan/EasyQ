<template>
  <div class="events container">
    <h2 class="subtitle is-3">Entrance for students and instructors</h2>
    <div class="columns is-multiline">
      <div v-for="event in events" :event="event" :key="event.id" class="column is-one-quarter">
        <router-link :to="`/event/${event.id}`">
          <EventCard :event="event" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import EventCard from "@/components/EventCard";
export default {
  name: "EventsList",
  components: {
    EventCard
  },
  data() {
    return {
      event: {},
      events: [
        {
          id: 1,
          name: "For students",
          category: "students",
          description:
            "Students could book office hour and queue up here.",
          featuredImage: "https://uwaterloo.ca/sites/uwaterloo.ca/files/uploads/images/study_and_research_essentials_final.jpg",
          images: [
            "https://uwaterloo.ca/sites/uwaterloo.ca/files/uploads/images/study_and_research_essentials_final.jpg"
          ],
          location: "UW",
          date: "02-01-2022",
          time: "11:30"
        }
        // {
        //   id: 2,
        //   name: "For instructors",
        //   category: "instructors",
        //   description:
        //     "Instructors could manage class and hold office hour here",
        //   featuredImage: "https://uwaterloo.ca/sites/uwaterloo.ca/files/uploads/images/wusa.png",
        //   images: ["https://uwaterloo.ca/sites/uwaterloo.ca/files/uploads/images/academic_success.png"],
        //   location: "UW",
        //   date: "02-01-2022",
        //   time: "12:00"
        // }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.events {
  margin-top: 100px;
  text-align: center;
}
</style>