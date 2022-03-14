<template>
    <div class="StudentHome">
        <div class="container">
            <student-event />
        </div>
    </div>
</template>
<script>
import StudentEvent from '../components/StudentEvent.vue';

export default {
    name: 'studenthome',
    components: {
      StudentEvent
    },
};
</script>
<style lang="scss" scoped>
  .card1 {
    height: 150px;
    width: 1300px;
    background-color: rgba(248, 227, 196, 0.35);
    background-position: center;
    background-size: cover;
    display: block;
  }
</style>
